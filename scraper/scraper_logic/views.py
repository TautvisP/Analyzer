from rest_framework import generics
from rest_framework import viewsets
#from rest_framework.filters import DjangoFilterBackend
#from django_filters.rest_framework import DjangoFilterBackend
#from rest_framework import filters
from .models import Tender
from .serializers import TenderSerializer
from django.shortcuts import render

class TenderListView(generics.ListCreateAPIView):
    queryset = Tender.objects.all()
    serializer_class = TenderSerializer
    #filter_backends = [DjangoFilterBackend]
    #filterset_fields = ['purchase_type', 'announcement_type']

class TenderViewSet(viewsets.ModelViewSet):
    queryset = Tender.objects.all()
    serializer_class = TenderSerializer

def home_view(request):
    tenders = Tender.objects.all()
    return render(request, 'home.html', {'tenders': tenders})
