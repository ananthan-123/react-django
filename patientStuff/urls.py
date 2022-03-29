from unicodedata import name
from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('patientDailyFormEndpoint/', views.PatientDailyFormViewSet.as_view(), name='patient_daily_form'),
    path('patientStatusHistoryEndpoint/', views.PatientStatusHistoryViewSet.as_view(), name='patient_status_history'),
]
