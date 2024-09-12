import requests
from bs4 import BeautifulSoup
from datetime import datetime
from .models import Tender

# Function to scrape tender data from a specified URL
def scrape_tenders(url):
    tenders_added = False
    print("Im Scraping, please wait. If this is my first time scraping, be patient, I've got to scrape 1500 Tenders ;)")
    try:
        # Send an HTTP GET request to fetch the webpage
        response = requests.get(url)
        response.raise_for_status()  # Check for HTTP request errors

        # Parse the HTML content of the page using BeautifulSoup
        soup = BeautifulSoup(response.content, 'lxml')

        # Initialize an empty list to store tender data
        tenders = []
        
        # Find all tender listings on the page (CSS class name should be updated based on the website's structure)
        tender_listings = soup.find_all('div', class_='notice-search-item')  # Replace with the correct CSS class

        # Loop through each tender listing found
        for tender in tender_listings:
            # Extract relevant fields from the tender listing
            title = tender.find('div', class_='notice-search-item-header').text.strip()

            bidder_info = tender.find('div', class_='left-col')
            bidder_name = bidder_info.find('a').text.strip()
            bidder_link = bidder_info.find('a')['href']

            # Extract announcement type if available
            announcement_type_div = bidder_info.find_all('div')[1]  # Assuming this is the second <div>
            if announcement_type_div:
                announcement_type = announcement_type_div.find('strong').text.strip()
            else:
                announcement_type = None

            right_col = tender.find('div', class_='right-col')
            for div in right_col.find_all('div'):
                text = div.text.strip()

                # Extract publication date, submission deadline, and code based on specific text labels
                if 'Paskelbimo data' in text:
                    publication_date = text.split(':')[-1].strip()

                if 'Pasiūlymų pateikimo terminas' in text:
                    submission_deadline = div.find('span').text.strip()

                if 'Skelbimo kodas' in text:
                    code = text.split(':')[-1].strip()

            # Convert date strings into datetime objects
            publication_date = datetime.strptime(publication_date, "%Y-%m-%d")
            submission_deadline = datetime.strptime(submission_deadline, "%Y-%m-%d")

            # Construct the full link to the secondary page for more details using the extracted code
            if code:
                full_link = f"https://cvpp.eviesiejipirkimai.lt/Notice/Details/{code}"

                # Fetch additional data from the secondary page
                cpv_code, purchase_type = scrape_additional_info(full_link)

                # Skip this tender if essential additional information is missing
                if not cpv_code or not purchase_type:
                    print(f"Skipping tender {title} due to missing additional info.")
                    continue

                # Check if the tender already exists in the database to avoid duplicates
                if Tender.objects.filter(cpv_code=cpv_code).exists():
                    print(f"Tender {title} with code {cpv_code} already exists. Stopping further scraping.")
                    break

                # Create and save a new Tender object to the database
                tender = Tender(
                    title=title,
                    bidder_name=bidder_name,
                    bidder_link=bidder_link,
                    publication_date=publication_date,
                    submission_deadline=submission_deadline,
                    cpv_code=cpv_code,
                    purchase_type=purchase_type,
                    announcement_type=announcement_type
                )
                tender.save()
                tenders_added = True

    except requests.exceptions.RequestException as e:
        # Handle and print errors related to HTTP requests
        print(f"Error fetching data from {url}: {e}")
        return []

    return tenders_added

# Function to scrape additional information from a secondary webpage
def scrape_additional_info(bidder_link):
    try:
        # Send an HTTP GET request to fetch the secondary webpage
        response = requests.get(bidder_link)
        response.raise_for_status()
        
        # Parse the HTML content of the secondary page
        soup = BeautifulSoup(response.content, 'lxml')

        # Extract the CPV code by finding the <h3> with the text 'Pagrindinis BVPŽ kodas' and getting the next <span>
        cpv_code_section = soup.find('h3', text='Pagrindinis BVPŽ kodas')
        if cpv_code_section:
            cpv_code = cpv_code_section.find_next('span').text.strip()  # Get the code from the next <span>
        else:
            cpv_code = None

        # Extract the purchase type from the second <h2> tag within the div class "eps-notice-header"
        header_div = soup.find('div', class_='eps-notice-header')
        if header_div:
            h2_tags = header_div.find_all('h2')
            if len(h2_tags) > 1:
                purchase_type = h2_tags[1].text.strip()
                # Ensure the purchase type is one of the expected values
                if purchase_type in ['Darbai', 'Paslaugos', 'Prekės']:
                    return cpv_code, purchase_type
                else:
                    return cpv_code, "Visos"  # Default value when the type is not matched
            else:
                return cpv_code, "Visos"  # Default value when there are not enough <h2> tags
        else:
            return cpv_code, "Visos"  # Default value when the header div is not found

    except requests.exceptions.RequestException as e:
        # Handle and print errors related to HTTP requests
        print(f"Error fetching data from {bidder_link}: {e}")
        return None, None
