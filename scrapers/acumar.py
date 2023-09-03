from django.core.management.base import BaseCommand
from tenders.models import * 
import re
import requests
from datetime import timedelta, datetime

def handle(self, *args, **kwargs):
        weeks_threshold = 53
        acumar_url = 'https://www.acumar.gob.ar/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=22559&target_action=get-all-data&default_sorting=new_first'
        acumar_response = requests.get(url=acumar_url, verify=False)
        acumar_tenders = acumar_response.json()

        limit_date = date.today() - timedelta(weeks=weeks_threshold)
        tenders = []

        for t in acumar_tenders:
            opening_date_str = t['value']['fechadeapertura']
            opening_date_str = opening_date_str.split("T")[0].replace('/', '-')
            
            try:
                opening_date = date.fromisoformat(opening_date_str)
            except ValueError:
                year, month, day = map(int, opening_date_str.split('-'))
                
                while day > 31:
                    day -= 31
                    month += 1

                while month > 12:
                    month -= 12
                    year += 1
                
                try:
                    opening_date = date(year, month, day)
                except ValueError: 
                    if month in [4, 6, 9, 11]:
                        day = 30
                    elif month == 2:
                        if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0): 
                            day = 29
                        else:
                            day = 28
                    opening_date = date(year, month, day)

            if opening_date > limit_date:  
                continue

            url_search = re.search(r'href=[\\\'"]?([^\\\'" >]+)', t['value']['nmerodeproceso'])
            if url_search:
                url = url_search.group(1) 
                tenders.append({
                    'name': t['value']['nombreproceso'],
                    'date_of_publication': opening_date.isoformat(), 
                    'url': url,
                    'source': 'ACUMAR'
                })

        for tender in tenders:
            Tenders.objects.create(
                name=tender['name'],
                date_of_publication=tender['date_of_publication'],
                url=tender['url'],
                source=tender['source'],
            )
        self.stdout.write(self.style.SUCCESS('Data scraping completed!'))