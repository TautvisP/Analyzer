"""
URL configuration for scraper project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from scraper_logic.views import home_view
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.views.generic import TemplateView

# View for the root URL
#def home_view(request):
#    return HttpResponse("Welcome to the homepage!")


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', home_view),
    #path('', home_view, name='home'),  # Root URL pattern for home page
    path('api/', include('scraper_logic.urls')),
    path('', TemplateView.as_view(template_name='index.html')),  # Serve React app
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
