from django.core.management.base import BaseCommand
from scraper_logic.scraper import scrape_tenders 

class Command(BaseCommand):
    help = 'Scrapes tender data from the target website and saves it to the database'

    def handle(self, *args, **kwargs):
        url = 'https://cvpp.eviesiejipirkimai.lt/?SelectedTextFilter=&Query=&OrderingType=0&OrderingDirection=0&IncludeExpired=false&Cpvs=&TenderId=&EpsReferenceNr=&DeadlineFromDate=&DeadlineToDate=&PublishedFromDate=&PublishedToDate=&IsGreenProcurement=false&PageNumber=1&PageSize=1500'
        scraped_data = scrape_tenders(url)

        if scraped_data == False:
            self.stdout.write(self.style.ERROR('No data was scraped.'))
            return

        self.stdout.write(self.style.SUCCESS('Successfully scraped and saved tender data.'))
