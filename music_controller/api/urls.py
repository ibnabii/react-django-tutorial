from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.RoomView.as_view(), name="home"),
    path("room-create/", views.CreateRoomView.as_view(), name="room_create"),
    path("get-room/", views.GetRoom.as_view(), name="get_room"),
    path("join-room/", views.JoinRoom.as_view(), name="join_room"),
    path("user-in-room/", views.UserInRoom.as_view(), name="user_in_room"),
]
