from django.shortcuts import render
from patientStuff.models import PatientDailyForm, PatientStatusHistory
from patientStuff.serializers import PatientDailyFormSerializer, PatientStatusHistorySerializer

from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import password_validators_help_texts

# Create your views here.


class PatientDailyFormViewSet(generics.ListCreateAPIView):
    """Gives the view for Filling out the status form sheet

    Args:
        generics (_type_): _description_
    """
    queryset = PatientDailyForm.objects.all()
    serializer_class = PatientDailyFormSerializer


class PatientStatusHistoryViewSet(generics.ListCreateAPIView):
    """Gives the view for storing the patients status form in the history table

    Args:
        generics (_type_): _description_
    """
    queryset = PatientStatusHistory.objects.all()
    serializer_class = PatientStatusHistorySerializer
