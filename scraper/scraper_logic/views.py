from rest_framework import generics
from .models import Tender
from .serializers import TenderSerializer
from django.core.management import call_command  # To call the custom management command
from django.utils.dateparse import parse_date
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.management import call_command
from django.http import JsonResponse
from django.db.models import Count
from datetime import datetime, timedelta
from .models import Tender

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
        date_from = self.request.query_params.get('date_from', '').strip()
        date_to = self.request.query_params.get('date_to', '').strip()

        #print(f"Filtering with - Purchase Type: {purchase_type}, Announcement Type: {announcement_type}")

        if purchase_type:
            queryset = queryset.filter(purchase_type__contains=purchase_type)
        if announcement_type:
            queryset = queryset.filter(announcement_type__contains=announcement_type)

        # Filter by publication date range if both 'date_from' and 'date_to' are provided
        if date_from and date_to:
            queryset = queryset.filter(publication_date__range=[parse_date(date_from), parse_date(date_to)])
        elif date_from:  # If only 'date_from' is provided
            queryset = queryset.filter(publication_date__gte=parse_date(date_from))
        elif date_to:  # If only 'date_to' is provided
            queryset = queryset.filter(publication_date__lte=parse_date(date_to))
            
        #print(f"Filtered queryset: {queryset}")
        return queryset


@csrf_exempt
def refresh_tenders(request):
    if request.method == 'POST':
        try:
            call_command('scrape_tenders')
            return JsonResponse({'status': 'success', 'message': 'Tenders refreshed successfully.'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=405)


def get_statistics(request):
    today = datetime.now()
    one_week_ago = today - timedelta(weeks=1)
    
    # Filter tenders from the last week
    recent_tenders = Tender.objects.filter(publication_date__gte=one_week_ago)
    
    # Get statistics for purchase types
    purchase_type_stats = (
        recent_tenders.values('purchase_type')
        .annotate(count=Count('id'))
        .order_by('purchase_type')
    )
    
    # Get statistics for announcement types
    announcement_type_stats = (
        recent_tenders.values('announcement_type')
        .annotate(count=Count('id'))
        .order_by('announcement_type')
    )
    
    # Convert querysets to dictionaries
    purchase_type_stats_dict = {item['purchase_type']: item['count'] for item in purchase_type_stats}
    announcement_type_stats_dict = {item['announcement_type']: item['count'] for item in announcement_type_stats}
    
    # Return JSON response
    return JsonResponse({
        'purchaseTypeStats': purchase_type_stats_dict,
        'announcementTypeStats': announcement_type_stats_dict,
    })