from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count
from .serializer import ServerSerializer
from .models import Category, Server, Channel
from .schema import server_list_docs


class ServerListView(viewsets.ModelViewSet):
    """
    a view for handling Server model operations.
    """

    queryset = Server.objects.all()  # Initial queryset containing all servers.
    serializer_class = ServerSerializer  # Serializer class for Server model.

    @server_list_docs
    def list(self, request):
        """Handle GET request for listing servers with optional query parameters.

        This method retrieves a list of servers based on the provided query parameters
        in the HTTP request. The query parameters allow for filtering, limiting the
        number of results, and including additional data such as the number of members
        in each server.

        Args:
            request (HttpRequest): The HTTP request object containing query parameters.

        Returns:
            Response: A JSON response containing a list of serialized server objects.

        Raises:
            AuthenticationFailed: If the request is not authenticated and the 'by_user'
                parameter is set, indicating a request to filter servers by the current user.
            ValidationError: If there is an issue with the provided query parameters, such
                as an invalid server ID or incorrect data format.

        Query Parameters:

            - 'category' (optional): Filter servers by category. Example: 'category=gaming'.
            - 'qty' (optional): Limit the number of servers returned. Example: 'qty=10'.
            - 'by_user' (optional): Filter servers by the current authenticated user.
                Requires authentication. Example: 'by_user=true'.
            - 'server_id' (optional): Filter servers by a specific server ID. Example: 'server_id=123'.
            - 'with_num_members' (optional): Include the number of members in each server's data.
                Example: 'with_num_members=true'.

        Example:
        GET /api/server/select/?category=gaming&qty=10&by_user=true
        This will return a list of up to 10 gaming servers owned by the current user.
        GET /api/server/select/?server_id=123&with_num_members=true
        This will return details of the server with ID 123 along with the number of members.

        """

        # Extract query parameters from the request.
        category = request.query_params.get("category", None)
        qty = request.query_params.get("qty", None)
        by_user = request.query_params.get("by_user", None) == "true"
        server_id = request.query_params.get("server_id", None)
        with_num_members = request.query_params.get("with_num_members") == "true"

        # Filter servers by category if specified.
        if category:
            self.queryset = self.queryset.filter(category=category)

        # Annotate servers with the number of members if requested.
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("channel_server"))

        # Filter server by server_id if specified.
        if server_id:
            # Ensure the request is authenticated.
            if not request.user.is_authenticated:
                raise AuthenticationFailed

            # Attempt to filter servers by server_id.
            try:
                self.queryset = self.queryset.filter(id=server_id)
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {server_id} not found"
                    )
            except ValueError as exc:
                raise ValidationError(detail="Incorrect server ID format.") from exc

        # Filter servers by user membership if requested.
        if by_user:
            # Ensure the request is authenticated.
            if not request.user.is_authenticated:
                raise AuthenticationFailed

            # Filter servers by the current user's ID.
            user_id = request.user.id
            self.queryset = self.queryset.filter(members=user_id)

        # Limit the number of servers returned if specified.
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Serialize the queryset and return the response.
        serializer = ServerSerializer(
            self.queryset, many=True, context={"with_num_members": with_num_members}
        )
        return Response(serializer.data)
