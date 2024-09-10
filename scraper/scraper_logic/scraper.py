import requests
from bs4 import BeautifulSoup
from datetime import datetime

# Function to scrape tender data
def scrape_tenders(url):
    try:
        # Send HTTP GET request to fetch the webpage
        response = requests.get(url)
        response.raise_for_status()  # Check for HTTP request errors
        
        # Parse HTML content with BeautifulSoup
        soup = BeautifulSoup(response.content, 'lxml')
        
        # Example: Find all tender listings (you need to inspect the website's structure for exact tags/classes)
        tenders = []
        tender_listings = soup.find_all('div', class_='notice-search-item')  # Replace with the correct CSS class
        
        for tender in tender_listings:
            # Extract relevant fields (example based on hypothetical HTML structure)
            title = tender.find('div', class_='notice-search-item-header').text.strip()

            bidder_info = tender.find('div', class_='left-col')
            bidder_name = bidder_info.find('a').text.strip()
            bidder_link = bidder_info.find('a')['href']

            right_col = tender.find('div', class_='right-col')
            for div in right_col.find_all('div'):
                text = div.text.strip()

                if 'Paskelbimo data' in text:
                    publication_date = text.split(':')[-1].strip()

                if 'Pasiūlymų pateikimo terminas' in text:
                    submission_deadline = div.find('span').text.strip()

                if 'Skelbimo kodas' in text:
                     cpv_code = text.split(':')[-1].strip()

            
            # Parse dates into proper datetime objects
            publication_date = datetime.strptime(publication_date, "%Y-%m-%d")
            submission_deadline = datetime.strptime(submission_deadline, "%Y-%m-%d")
            
            # Add data to the tenders list
            tenders.append({
                'title': title,
                'bidder_name': bidder_name,
                'bidder_link': bidder_link,
                'publication_date': publication_date,
                'submission_deadline': submission_deadline,
                'cpv_code': cpv_code,
            })

        return tenders

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {e}")
        return []

