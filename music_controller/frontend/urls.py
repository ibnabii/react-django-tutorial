from django.urls import path

from . import views

urlpatterns = [
    path("", views.index),
    path("join/", views.index),
    path("join/1/", views.index),
    path("create/", views.index),
]
