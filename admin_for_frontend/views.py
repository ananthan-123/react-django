from django.shortcuts import render
from users.models import Patient, Doctor
from immigrationOfficer.models import ImmigrationOfficer
from .serializers import PatientSerializer, DoctorSerializer, ImmigrationOfficerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics

# Create your views here.
@api_view(['GET', ])
def people_num_count(request):
    """
    count the patients, doctors, immigration officers num
    """
    data = {
        'patient': Patient.objects.count(),
        'doctor': Doctor.objects.count(),
        'immigrationOfficer': ImmigrationOfficer.objects.count(),
    }
    return Response(data)

class PatientList(generics.ListAPIView):
    """
    patient list
    is_prioritized 
    """
    queryset = Patient.objects.all().order_by('-is_prioritized')
    serializer_class = PatientSerializer

class DoctorList(generics.ListAPIView):
    """
    Doctor list
    """
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class ImmigrationOfficerList(generics.ListAPIView):
    """
    Immigration officer list
    """
    queryset = ImmigrationOfficer.objects.all()
    serializer_class = ImmigrationOfficerSerializer