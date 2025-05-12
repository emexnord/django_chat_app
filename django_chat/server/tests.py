from django.test import TestCase

from .tests import *  # Import everything from tests.py to test


class ExampleTestCase(TestCase):
    def test_example(self):
        # Example test to ensure the test framework is working
        self.assertEqual(1 + 1, 2)
