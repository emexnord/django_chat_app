from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied
from .serializer import CategorySerializer, ChannelSerializer
from .models import Category, Channel


class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling Category model operations.
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request):
        """
        List all categories.
        """
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Retrieve a single category by ID.
        """
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise NotFound("Category not found.")
        serializer = self.get_serializer(category)
        return Response(serializer.data)


class ChannelViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling Channel model operations.
    """

    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer

    def list(self, request):
        """
        List all channels, optionally filter by server.
        """
        server_id = request.query_params.get("server_id", None)
        queryset = self.queryset
        if server_id:
            queryset = queryset.filter(server_id=server_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Retrieve a single channel by ID.
        """
        try:
            channel = Channel.objects.get(pk=pk)
        except Channel.DoesNotExist:
            raise NotFound("Channel not found.")
        serializer = self.get_serializer(channel)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def join(self, request, pk=None):
        """
        Custom action to join a channel.
        """
        try:
            channel = Channel.objects.get(pk=pk)
        except Channel.DoesNotExist:
            raise NotFound("Channel not found.")
        user = request.user
        if user in channel.members.all():
            return Response({"detail": "Already a member."}, status=status.HTTP_200_OK)
        channel.members.add(user)
        return Response({"detail": "Joined channel."}, status=status.HTTP_200_OK)
