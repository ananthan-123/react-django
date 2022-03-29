from dataclasses import field
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import PatientDailyForm, PatientStatusHistory


class PatientDailyFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientDailyForm
        fields = '__all__'


class PatientStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientStatusHistory
        fields = ('patient', 'patient_form')
