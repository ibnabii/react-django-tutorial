from django.contrib import admin
from django.contrib.sessions.models import Session
from .models import Room


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    pass


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()

    list_display = ["session_key", "_session_data", "expire_date"]
