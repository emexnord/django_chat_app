from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from .tests import UserModelTest

# relative import of the TestCase class defined in tests.py (the "function to test" per instructions)


class UserModelAdditionalTests(UserModelTest):
    def test_user_created(self):
        self.assertIsNotNone(self.user.id)

    def test_username_matches(self):
        self.assertEqual(self.user.username, "testuser")

    def test_password_check(self):
        self.assertTrue(self.user.check_password("testpassword"))

    def test_is_active_default_true(self):
        self.assertTrue(self.user.is_active)

    def test_str_returns_username(self):
        self.assertEqual(str(self.user), "testuser")

    def test_authenticate_with_valid_credentials(self):
        user = authenticate(username="testuser", password="testpassword")
        self.assertIsNotNone(user)
        self.assertEqual(user.pk, self.user.pk)

    def test_duplicate_username_raises_integrity_error(self):
        with self.assertRaises(IntegrityError):
            User.objects.create_user(username="testuser", password="another")
