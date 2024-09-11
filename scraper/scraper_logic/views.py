from rest_framework import generics
from rest_framework import viewsets
from rest_framework import filters
from .models import Tender
from .serializers import TenderSerializer
from django.shortcuts import render

from rest_framework import generics
from .models import Tender
from .serializers import TenderSerializer

class TenderListView(generics.ListCreateAPIView):
    serializer_class = TenderSerializer

    def get_queryset(self):
        queryset = Tender.objects.all()
        purchase_type = self.request.query_params.get('purchase_type', None)
        announcement_type = self.request.query_params.get('announcement_type', None)

        if purchase_type:
            queryset = queryset.filter(purchase_type__icontains=purchase_type)
        if announcement_type:
            queryset = queryset.filter(announcement_type__icontains=announcement_type)

        return queryset


class TenderViewSet(viewsets.ModelViewSet):
    queryset = Tender.objects.all()
    serializer_class = TenderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        purchase_type = self.request.query_params.get('purchase_type', '').strip()
        announcement_type = self.request.query_params.get('announcement_type', '').strip()

        print(f"Filtering with purchase_type: '{purchase_type}'")
        print(f"Filtering with announcement_type: '{announcement_type}'")

        for tender in queryset:
            print(f"Tender ID: {tender.id}, Title: {tender.title}, Purchase Type: {tender.purchase_type}, Announcement Type: {tender.announcement_type}, CPV: {tender.cpv_code}")


        if purchase_type:
            queryset = queryset.filter(purchase_type__contains=purchase_type)
        if announcement_type:
            queryset = queryset.filter(announcement_type__contains=announcement_type)

        return queryset
    
def home_view(request):
    tenders = Tender.objects.all()
    return render(request, 'home.html', {'tenders': tenders})
