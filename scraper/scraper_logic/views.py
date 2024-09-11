from rest_framework import generics
from .models import Tender
from .serializers import TenderSerializer
from django.core.management import call_command  # To call the custom management command


class TenderListView(generics.ListCreateAPIView):
    print("Searching and returning all tenders")
    
    try:
       call_command('scrape_tenders')  # This triggers the command that scrapes tenders
    except Exception as e:
       print(f"Error during scraping: {e}")

    queryset = Tender.objects.all()
    serializer_class = TenderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        purchase_type = self.request.query_params.get('purchase_type', '').strip()
        announcement_type = self.request.query_params.get('announcement_type', '').strip()

        #print(f"Filtering with - Purchase Type: {purchase_type}, Announcement Type: {announcement_type}")

        if purchase_type:
            queryset = queryset.filter(purchase_type__contains=purchase_type)
        if announcement_type:
            queryset = queryset.filter(announcement_type__contains=announcement_type)
            
        #print(f"Filtered queryset: {queryset}")
        return queryset
