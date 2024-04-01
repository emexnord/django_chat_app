from django.contrib import admin

from .models import Server, Catagory, Channel

admin.site.register(Server)
admin.site.register(Catagory)
admin.site.register(Channel)