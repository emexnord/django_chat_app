from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from server.views import ServerViewSet, UserViewSet, MessageViewSet

router = DefaultRouter()
router.register(r"api/servers", ServerViewSet, basename="server")
router.register(r"api/users", UserViewSet, basename="user")
router.register(r"api/messages", MessageViewSet, basename="message")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
