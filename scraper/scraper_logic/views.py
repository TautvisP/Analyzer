from rest_framework import generics
from .models import Tender
from .serializers import TenderSerializer
from django.shortcuts import render

class TenderListView(generics.ListCreateAPIView):
    queryset = Tender.objects.all()
    serializer_class = TenderSerializer

def home_view(request):
    tenders = Tender.objects.all()
    return render(request, 'home.html', {'tenders': tenders})
