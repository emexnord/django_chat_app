from django.contrib import admin

from .models import Server, Catagory, Channel

admin.site.register(Server)
admin.site.register(Catagory)


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ("name", "server", "created_at")
    search_fields = ("name", "server__name")
    list_filter = ("server", "created_at")
    ordering = ("server", "name")
