from bs4 import BeautifulSoup

from selenium import webdriver
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.edge.options import Options
from selenium.common.exceptions import TimeoutException

import pandas as pd

from datetime import datetime, timedelta

# So Edge doesn't close
options = Options()
options.add_experimental_option("detach", True)

# Load driver 
driver = webdriver.Edge(EdgeChromiumDriverManager().install(), options=options) 

# Set the URL from website we want to scrape 
url = 'https://comprar.gob.ar/BuscarAvanzadoPublicacion.aspx'

# To scrape a website with dynamic content, we'll use Selenium to interact with the website
driver.get(url)

tenders = []
keywords = ["agua", "suelo", "proyecto"]
today = datetime.today()
twoWeeksAgo = today - timedelta(days=14)
twoWeeksAgo = datetime.strftime(twoWeeksAgo, '%d/%m/%Y')
today = datetime.strftime(today, '%d/%m/%Y') 


keyword = "agua"
driver.find_element(By.XPATH, '//*[@id="ctl00_CPH1_txtPublicacionObjeto"]').send_keys(keyword)
driver.find_element(By.XPATH, '//*[@id="ctl00_CPH1_devDteEdtFechaAperturaDesde_I"]').send_keys(twoWeeksAgo)
driver.find_element(By.XPATH, '//*[@id="ctl00_CPH1_devDteEdtFechaAperturaHasta_I"]').send_keys(today)

driver.find_element(By.XPATH, '//*[@id="ctl00_CPH1_btnListarPublicacionAvanzado"]').click()

try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="ctl00_CPH1_GridListaPliegos"]'))
    )
except TimeoutException:
    print("Timed out waiting for page to load") 

# Locate the table
# Locate the table
table = driver.find_element(By.ID, 'ctl00_CPH1_GridListaPliegos')

# Get all the 'tr' elements in the table
rows = table.find_elements(By.TAG_NAME, "tr")

# Now 'data' is a list of lists, each inner list having the hyperlink from the first column and the text from the fourth column.
tenders = []

# Iterate over the rows
for i, row in enumerate(rows):
    # Get 'td' elements inside the 'tr'
    cols = row.find_elements(By.TAG_NAME, "td")

    # Ensure there are at least four columns
    if len(cols) >= 4:
        # First column with hyperlink
        link = cols[0].find_element(By.TAG_NAME, "a").get_attribute('href')

        # Save the current window handle
        original_window = driver.current_window_handle

        # Open a new tab
        driver.execute_script("window.open();")

        # Switch to the new tab
        driver.switch_to.window(driver.window_handles[-1])

        # Navigate to the URL in the new tab
        driver.get(link)

        # Fourth column with text
        text = cols[3].find_element(By.TAG_NAME, "p").find_element(By.TAG_NAME, "span").text

        # After you're done, close the new tab
        driver.close()

        # And switch back to the original tab
        driver.switch_to.window(original_window)

        # Append data
        tenders.append([link, text])

    else:
        print(f"Skipping row {i} as it doesn't contain 4 columns")

driver.quit()

print(tenders)




