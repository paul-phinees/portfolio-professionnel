"""
URL configuration for agricultural_decision_support project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/agriculture/', include('agriculture.urls')),
    path('api/weather/', include('weather.urls')),
    path('api/soil/', include('soil.urls')),
    path('api/recommendations/', include('recommendations.urls')),
    path('api/alerts/', include('alerts.urls')),
    path('api/simulations/', include('simulations.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

