from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TenderListView

router = DefaultRouter()

urlpatterns = [
    path('tenders/', TenderListView.as_view(), name='tender-list'),  # Updated path for unfiltered and filtered tenders
    path('', TenderListView.as_view(), name='home'),  # Assuming you want the home view to use the same view
]
