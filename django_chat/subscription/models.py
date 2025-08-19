from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Subscription(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="subscriptions"
    )
    plan = models.CharField(max_length=100)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.plan}"
