from django.urls import path
from .views import TenderListView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenderViewSet

urlpatterns = [
    #path('tenders/', TenderListView.as_view(), name='tender-list'),
    #path('api/tenders/', TenderListView.as_view(), name='tender-list'),
    path('tenders/', TenderListView.as_view(), name='tender-list-create'),
]


router = DefaultRouter()
router.register(r'tenders', TenderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


