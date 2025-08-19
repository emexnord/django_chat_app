from .models import Subscription
from django.utils import timezone


def create_subscription(user, plan, duration_days=None):
    end_date = None
    if duration_days:
        end_date = timezone.now() + timezone.timedelta(days=duration_days)
    subscription = Subscription.objects.create(
        user=user, plan=plan, end_date=end_date, is_active=True
    )
    return subscription


def cancel_subscription(subscription):
    subscription.is_active = False
    subscription.end_date = timezone.now()
    subscription.save()
    return subscription
