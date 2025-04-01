from django.test import TestCase
from django.contrib.auth.models import User


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpassword"
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, "testuser")
        self.assertTrue(self.user.check_password("testpassword"))

    def test_user_str_representation(self):
        self.assertEqual(str(self.user), "testuser")
