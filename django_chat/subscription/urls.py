from django.urls import path
from .views import SubscriptionCreateView, SubscriptionCancelView, SubscriptionListView

urlpatterns = [
    path("create/", SubscriptionCreateView.as_view(), name="subscription-create"),
    path(
        "cancel/<int:pk>/", SubscriptionCancelView.as_view(), name="subscription-cancel"
    ),
    path("list/", SubscriptionListView.as_view(), name="subscription-list"),
]
