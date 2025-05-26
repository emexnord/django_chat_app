from django.test import TestCase

from .tests import *  # Import everything from tests.py to test


class ExampleTestCase(TestCase):
    def test_example(self):
        # Example test to ensure the test framework is working
        self.assertEqual(1 + 1, 2)

        def test_false_is_not_true(self):
            self.assertFalse(False)

        def test_uppercase(self):
            self.assertEqual("chat".upper(), "CHAT")

        def test_isupper(self):
            self.assertTrue("CHAT".isupper())
            self.assertFalse("Chat".isupper())

        def test_split(self):
            s = "hello world"
            self.assertEqual(s.split(), ["hello", "world"])
            with self.assertRaises(TypeError):
                s.split(2)
