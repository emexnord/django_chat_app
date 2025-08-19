from django.contrib import admin
from .models import Server, Category, Channel


@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner", "created_at", "member_count")
    search_fields = ("name", "owner__username")
    list_filter = ("created_at",)
    ordering = ("-created_at",)
    readonly_fields = ("created_at", "member_count")

    def member_count(self, obj):
        return obj.members.count()

    member_count.short_description = "Members"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "server", "created_at")
    search_fields = ("name", "server__name")
    list_filter = ("server", "created_at")
    ordering = ("server", "name")


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "server", "category", "created_at", "is_private")
    search_fields = ("name", "server__name", "category__name")
    list_filter = ("server", "category", "created_at", "is_private")
    ordering = ("server", "category", "name")
    readonly_fields = ("created_at",)

    def is_private(self, obj):
        return getattr(obj, "is_private", False)

    is_private.boolean = True
    is_private.short_description = "Private?"
