from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TenderListView, refresh_tenders, get_statistics, RegisterView, LoginView, LogoutView, check_auth

router = DefaultRouter()

urlpatterns = [
    path('tenders/', TenderListView.as_view(), name='tender-list'), 
    path('refresh-tenders/', refresh_tenders, name='refresh-tenders'),
    path('statistics/', get_statistics, name='get_statistics'),
    path('', LoginView.as_view(), name='home'),
  
    
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('check-auth/', check_auth, name='check-auth'),
]
