import requests
from datetime import datetime
from bs4 import BeautifulSoup
import re
import json

tenders = []

class Scrape:
    help = "Runs the scraper."

    def handle(self, *args, **options):
        try:
            self.scrape_aysa()
            self.scrape_comirec()

            with open("tenders.json", "w", encoding="utf-8") as f:
                json.dump(tenders, f, ensure_ascii=False, indent=4)

            print("Data scraping completed!")
        except Exception as e:
            print(f"An error occurred: {e}")

    def scrape_aysa(self):
        aysa_url = "https://www.aysa.com.ar/api/licitaciones/getLicitacionesObraByFiltersPublic"
        payload = {
            "current": "1",
            "rowCount": "1000",
            "searchPhrase": "",
            "FechaPublicacionDesde": "",
            "FechaPublicacionHasta": "",
            "PalabrasClave": "",
        }

        response = requests.post(aysa_url, json=payload, verify=False)
        aysa_tenders = response.json()["rows"]

        first_part_url = "https://www.aysa.com.ar/proveedores/licitaciones/Licitaciones-Obras-Expansion/Detalle_de_Licitaciones_Obras?id="
        for tender in aysa_tenders:
            name = tender["Objeto"]
            url = first_part_url + tender["Id"]
            date_of_publication_str = tender["FechaPublicacion"]
            date_of_publication = datetime.strptime(
                date_of_publication_str.split("T")[0], "%Y-%m-%d"
            ).date()
            date_of_publication = date_of_publication.isoformat()
            source = "AYSA"

            tender = {
                "name": name,
                "dateofpublication": date_of_publication,
                "url": url,
                "source": source,
            }

            tenders.append(tender)

    def scrape_comirec(self):
        comirec = "https://www.gba.gob.ar/comirec/licitaciones_comirec"
        response = requests.get(comirec)
        soup = BeautifulSoup(response.text, "lxml")

        data = soup.find_all("div", class_="field-item even")[6]
        p = data.find_all("p")
        h3 = data.find_all("h3")

        comirec_tenders = []
        for name in h3:
            tender = {}
            if name.text.startswith("OBJETO: "):
                tender_name = name.text.split("OBJETO: ")
                tender["name"] = tender_name[1]
                comirec_tenders.append(tender)

        i = 0
        for info in p:
            if info.text.startswith("Fecha de apertura:"):
                date_of_publication_str = info.text.split("Fecha de apertura:")[1]
                clean_date_of_publication_str = self.cleanDate(date_of_publication_str)
                date_of_publication = datetime.strptime(
                    clean_date_of_publication_str, "%Y-%m-%d"
                ).date()
                date_of_publication = date_of_publication.isoformat()
                comirec_tenders[i]["dateofpublication"] = date_of_publication

            if info.text.startswith(
                ("Llamado a licitación", "Documentación Licitatoria")
            ):
                a_tag = info.find("a")
                comirec_tenders[i]["url"] = a_tag["href"]
                i += 1

        source = "COMIREC"
        for tender in comirec_tenders:
            tender["source"] = source

        tenders.extend(comirec_tenders)

    def cleanDate(self, s):
        month_dict = {
            "enero": 1,
            "feb": 2,
            "marzo": 3,
            "abr": 4,
            "abril": 4,
            "mayo": 5,
            "junio": 6,
            "julio": 7,
            "agosto": 8,
            "septiembre": 9,
            "sep": 9,
            "octubre": 10,
            "oct": 10,
            "nov": 11,
            "noviembre": 11,
            "diciembre": 12,
            "dic": 12,
        }

        pattern = r"(\d{1,2})\s*(de)?\s*([a-zA-Z]+\.?)\s*(de|del)?\s*(\d{4})"
        match = re.search(pattern, s)

        if match:
            day = int(match.group(1))
            month_name = match.group(3).lower().strip(".")
            month = month_dict.get(month_name, None)
            year = int(match.group(5))

            if month:
                date_str = f"{year}-{month:02d}-{day:02d}"
                return date_str
        return None


if __name__ == "__main__":
    scraper = Scrape()
    scraper.handle()
