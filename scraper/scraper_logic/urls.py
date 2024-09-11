#from django.urls import path
#from .views import TenderListView

#urlpatterns = [
#    #path('tenders/', TenderListView.as_view(), name='tender-list'),
#    path('api/tenders/', TenderListView.as_view(), name='tender-list'),
#]


# scraper_logic/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenderViewSet

router = DefaultRouter()
router.register(r'tenders', TenderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


