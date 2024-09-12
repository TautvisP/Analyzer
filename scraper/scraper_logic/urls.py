from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TenderListView, refresh_tenders, get_statistics

router = DefaultRouter()

urlpatterns = [
    path('tenders/', TenderListView.as_view(), name='tender-list'),  # Updated path for unfiltered and filtered tenders
    path('refresh-tenders/', refresh_tenders, name='refresh-tenders'),
    path('statistics/', get_statistics, name='get_statistics'),
    path('', TenderListView.as_view(), name='home'),  # Assuming you want the home view to use the same view
]
