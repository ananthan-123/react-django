from atexit import register
from datetime import datetime
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

# from .models import Patient

from django.conf import settings
from django.contrib.auth.models import User
from django.urls import reverse
from patientStuff.models import PatientDailyForm, PatientStatusHistory
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from users.models import Doctor, Patient, UserInfo


# Create your tests here.
class PatientDailyFormTestCase(APITestCase):
    patient_daily_form = reverse('patient_daily_form')

    def setUp(self):
        # self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        self.user_info = UserInfo.objects.create(
            user=self.user
        )
        self.patient = Patient.objects.create(
            user_info=self.user_info
        )
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_form(self):
        data = {
            "sex": 0,
            "age_range": 0,
            "test_status": True,
            "recent_test_date": None,
            "test_result": True,
            "body_temp": 120.5,
            "weight": 123.5,
            "self_assessment": 0,
            "symptoms": 2,
            "vaxination_count": 3
        }
        response = self.client.post(
            self.patient_daily_form,
            data=data,
            format='json',
        )
        # Get back the form stored in the table
        form = PatientDailyForm.objects.get(pk=1)
        # Check if the data response stored the form correctly
        self.assertEqual(response.data['sex'], form.sex)
        self.assertEqual(response.data['age_range'], form.age_range)
        self.assertEqual(response.data['test_status'], form.test_status)
        self.assertEqual(response.data['recent_test_date'], str(form.recent_test_date))
        self.assertEqual(
            response.data['test_result'], form.test_result)
        self.assertEqual(
            response.data['body_temp'], form.body_temp)
        self.assertEqual(response.data['weight'], form.weight)
        self.assertEqual(response.data['self_assessment'], form.self_assessment)
        self.assertEqual(response.data['symptoms'], form.symptoms)
        self.assertEqual(response.data['vaxination_count'], form.vaxination_count)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class PatientDailyFormTestCase(APITestCase):
    patient_status_history = reverse('patient_status_history')

    def setUp(self):
        # self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        self.user_info = UserInfo.objects.create(
            user=self.user
        )
        self.patient = Patient.objects.create(
            user_info=self.user_info
        )
        self.form = PatientDailyForm.objects.create(
            sex=0,
            age_range=0,
            test_status=True,
            recent_test_date=None,
            test_result=True,
            body_temp=120.5,
            weight=123.5,
            self_assessment=0,
            symptoms=2,
            vaxination_count=3
        )
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_history(self):
        data = {
            "patient": self.patient.id,
            "patient_form": self.form.id,
        }
        response = self.client.post(
            self.patient_status_history,
            data=data,
            format='json',
        )
        # Get back the status history stored in the table
        status_history = PatientStatusHistory.objects.get(pk=1)
        self.assertEqual(response.data['patient'], status_history.patient.id)
        self.assertEqual(
            response.data['patient_form'], status_history.patient_form.id)
        # Check if the data response stored the history correctly
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
