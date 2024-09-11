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

            # Find the div containing "Skelbimo tipas" and extract the text within <strong>
            announcement_type_div = bidder_info.find_all('div')[1]  # Assuming this is the second <div>
            if announcement_type_div:
                announcement_type = announcement_type_div.find('strong').text.strip()
            else:
                announcement_type = None

            right_col = tender.find('div', class_='right-col')
            for div in right_col.find_all('div'):
                text = div.text.strip()

                if 'Paskelbimo data' in text:
                    publication_date = text.split(':')[-1].strip()

                if 'Pasiūlymų pateikimo terminas' in text:
                    submission_deadline = div.find('span').text.strip()

                if 'Skelbimo kodas' in text:
                    code = text.split(':')[-1].strip()

            
            # Parse dates into proper datetime objects
            publication_date = datetime.strptime(publication_date, "%Y-%m-%d")
            submission_deadline = datetime.strptime(submission_deadline, "%Y-%m-%d")
            

            # Construct the full link to the secondary page using the extracted code
            if code:
                full_link = f"https://cvpp.eviesiejipirkimai.lt/Notice/Details/{code}"

                # Fetch additional data from the secondary page
                cpv_code, purchase_type = scrape_additional_info(full_link)

                if not cpv_code or not purchase_type:
                    print(f"Skipping tender {title} due to missing additional info.")
                    continue

                # Add data to the tenders list
                tenders.append({
                    'title': title,
                    'bidder_name': bidder_name,
                    'bidder_link': bidder_link,
                    'publication_date': publication_date,
                    'submission_deadline': submission_deadline,
                    'cpv_code': cpv_code,
                    'purchase_type': purchase_type,
                    'announcement_type': announcement_type
                })

        return tenders

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {e}")
        return []


# Function to scrape secondary webpage
def scrape_additional_info(bidder_link):
    try:
        response = requests.get(bidder_link)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'lxml')

        # Extract the CPV code: locate <h3> with the text 'Pagrindinis BVPŽ kodas', then get the next <span>
        cpv_code_section = soup.find('h3', text='Pagrindinis BVPŽ kodas')
        if cpv_code_section:
            cpv_code = cpv_code_section.find_next('span').text.strip()  # Get the code from the next <span>
        else:
            cpv_code = None

       # Extract purchase type from the second <h2> within the div class "eps-notice-header"
        header_div = soup.find('div', class_='eps-notice-header')
        if header_div:
            h2_tags = header_div.find_all('h2')
            if len(h2_tags) > 1:
                purchase_type = h2_tags[1].text.strip()
                # Check if the text matches one of the expected values
                if purchase_type in ['Darbai', 'Paslaugos', 'Prekės']:
                    return cpv_code, purchase_type
                else:
                    return cpv_code, "Visos"  # Default value when the type is not matched
            else:
                return cpv_code, "Visos"  # Default value when there are not enough <h2> tags
        else:
            return cpv_code, "Visos"  # Default value when the header div is not found


    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {bidder_link}: {e}")
        return None, None