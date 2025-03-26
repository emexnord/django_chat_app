from django.db import models
from django.contrib.auth.models import AbstractUser

class Account(AbstractUser):
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return self.username