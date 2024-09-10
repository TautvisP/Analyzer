from django.core.management.base import BaseCommand
from scraper_logic.scraper import scrape_tenders  # Import your scraping function
from scraper_logic.models import Tender  # Import your Tender model

class Command(BaseCommand):
    help = 'Scrapes tender data from the target website and saves it to the database'

    def handle(self, *args, **kwargs):
        # Specify the target URL for scraping
        url = 'https://cvpp.eviesiejipirkimai.lt/'  # Use the actual URL
        scraped_data = scrape_tenders(url)

        if not scraped_data:
            #print(scraped_data)
            self.stdout.write(self.style.ERROR('No data was scraped.'))
            return

        for data in scraped_data:
            Tender.objects.update_or_create(
                title=data['title'],
                defaults={
                    'bidder_name': data['bidder_name'],
                    'bidder_link': data['bidder_link'],
                    'publication_date': data['publication_date'],
                    'submission_deadline': data['submission_deadline'],
                    'cpv_code': data['cpv_code'],
                }
            )

        self.stdout.write(self.style.SUCCESS('Successfully scraped and saved tender data.'))
