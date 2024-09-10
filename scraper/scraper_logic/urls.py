from django.urls import path
from .views import TenderListView

urlpatterns = [
    path('tenders/', TenderListView.as_view(), name='tender-list'),
]


