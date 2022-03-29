from django.urls import include, path
from rest_framework import routers
from .views import *

app_name = 'admin_for_frontend'

urlpatterns = [
    path('people_num_count', people_num_count, name='people_num_count'),
    path('patients', PatientList.as_view(), name='patient_list'),
    path('doctors', DoctorList.as_view(), name='doctor_list'),
    path('immigration_officers', ImmigrationOfficerList.as_view(), name='immigration_list'),
    path(
        'api-auth/',
        include(
            'rest_framework.urls',
            namespace='rest_framework'))
    
]