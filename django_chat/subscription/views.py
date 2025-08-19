from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Subscription
from .service import create_subscription, cancel_subscription
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

User = get_user_model()


class SubscriptionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        plan = request.data.get("plan")
        duration_days = request.data.get("duration_days")
        subscription = create_subscription(request.user, plan, duration_days)
        return Response(
            {
                "id": subscription.id,
                "plan": subscription.plan,
                "is_active": subscription.is_active,
            },
            status=status.HTTP_201_CREATED,
        )


class SubscriptionCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            subscription = Subscription.objects.get(pk=pk, user=request.user)
        except Subscription.DoesNotExist:
            return Response(
                {"error": "Subscription not found."}, status=status.HTTP_404_NOT_FOUND
            )
        cancel_subscription(subscription)
        return Response(
            {"id": subscription.id, "is_active": subscription.is_active},
            status=status.HTTP_200_OK,
        )


class SubscriptionListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = None  # You can add a serializer if needed

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)

    def list(self, request):
        queryset = self.get_queryset()
        data = [
            {"id": sub.id, "plan": sub.plan, "is_active": sub.is_active}
            for sub in queryset
        ]
        return Response(data)
