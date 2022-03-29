from atexit import register
from datetime import datetime
from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

# from .models import Patient

from django.conf import settings
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from users.models import Doctor, Patient, UserInfo


# Create your tests here.


class UserTestCase(APITestCase):

    register_url = reverse('register_user')
    login_url = reverse('login_user')

    def setUp(self):
        pass

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    # test on first name input
    def test_user_signup(self):
        data = {
            "username": "test123",
            "first_name": "Tester",
            "last_name": "Tester",
            "email": "Tester@gmail.com",
            "password": "test123"
        }
        response = self.client.post(
            self.register_url,
            data=data,
            format='json',
        )
        test_first_name = User.objects.get(pk=1)
        self.assertEqual(test_first_name.first_name, "Tester")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_login(self):

        # Create a new user and then login with that user.
        data = {
            "username": "test123",
            "first_name": "Tester",
            "last_name": "Tester",
            "email": "Tester@gmail.com",
            "password": "test123"
        }
        response = self.client.post(
            self.register_url,
            data=data,
            format='json',
        )

        # Login Section
        data = {
            "username": "test123",
            "password": "test123"
        }
        response = self.client.post(
            self.login_url,
            data=data,
            format='json',
        )

        # Test if the response returns any data from the user (ie. first_name)
        self.assertEqual(response.data['user']['first_name'], "Tester")
        # The login url was valid according to the response
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserInfoTestCase(APITestCase):
    create_user_info = reverse('register_user_info')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            username="test123",
            first_name="Tester",
            last_name="Tester",
            email="Tester@gmail.com",
            password="test123"
        )
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_user_info(self):
        data = {
            "user": self.user.pk,
            "phone_number": 5145145144,
            "user_identity": 1,
        }
        response = self.client.post(
            self.create_user_info,
            data=data,
            format='json',
        )
        #Get back the user_info stored in the table
        user_info = UserInfo.objects.get(pk=1)
        # Check if the data response stored the user_info correctly
        self.assertEqual(response.data['user_info']['user'], user_info.user.id)
        self.assertEqual(response.data['user_info']['phone_number'], user_info.phone_number)
        self.assertEqual(response.data['user_info']['user_identity'], user_info.user_identity)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class PatientTestCase(APITestCase):
    create_patient = reverse('patient_create')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
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
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_patient(self):
        data = {
            "user": self.user_info.id,
            "current_sex": 0,
            "current_age_range": 0,
            "current_test_status": False,
            #... Other values can be added but will keep this patient simple
        }
        response = self.client.post(
            self.create_patient,
            data=data,
            format='json',
        )
        # Get back the patient stored in the table
        patient = Patient.objects.get(pk=1)
        # Check if the data response stored the patient correctly
        self.assertEqual(response.data['user_info'], patient.user_info)
        self.assertEqual(response.data['current_sex'], patient.current_sex)
        self.assertEqual(response.data['current_age_range'], patient.current_age_range)
        self.assertEqual(response.data['current_test_status'], patient.current_test_status)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class DoctorTestCase(APITestCase):
    create_doctor = reverse('doctor_create')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
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
        # settings.MEDIA_ROOT = tempfile.mkdtemp()
        # self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_create_doctor(self):
        data = {
            "user": self.user_info.id,
            "profession": "Cardiology",
        }
        response = self.client.post(
            self.create_doctor,
            data=data,
            format='json',
        )
        # Get back the doctor stored in the table
        doctor = Doctor.objects.get(pk=1)
        # Check if the data response stored the doctor correctly
        self.assertEqual(response.data['user_info'], doctor.user_info)
        self.assertEqual(response.data['profession'], "Cardiology")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

