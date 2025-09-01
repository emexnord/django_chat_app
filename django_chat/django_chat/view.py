from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import ChatMessage, ChatRoom
from django.contrib.auth.models import User
import json


@login_required
def chat_room(request, room_name):
    """
    Render the chat room page.
    """
    return render(request, "chat/room.html", {"room_name": room_name})


@csrf_exempt
@login_required
def send_message(request):
    """
    Handle sending a chat message.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        message = data.get("message")
        room_name = data.get("room_name")

        if message and room_name:
            chat_message = ChatMessage.objects.create(
                user=request.user, room_name=room_name, message=message
            )
            return JsonResponse({"status": "success", "message": "Message sent."})
        return JsonResponse({"status": "error", "message": "Invalid data."})
    return JsonResponse({"status": "error", "message": "Invalid request method."})


@login_required
def get_messages(request, room_name):
    """
    Retrieve chat messages for a specific room.
    """
    messages = ChatMessage.objects.filter(room_name=room_name).order_by("timestamp")
    messages_data = [
        {"user": msg.user.username, "message": msg.message, "timestamp": msg.timestamp}
        for msg in messages
    ]
    return JsonResponse({"status": "success", "messages": messages_data})


@login_required
def list_rooms(request):
    """
    List all chat rooms.
    """
    rooms = ChatRoom.objects.all()
    rooms_data = [
        {"name": room.name, "created_by": room.created_by.username} for room in rooms
    ]
    return JsonResponse({"status": "success", "rooms": rooms_data})


@csrf_exempt
@login_required
def create_room(request):
    """
    Create a new chat room.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        room_name = data.get("room_name")
        if room_name:
            room, created = ChatRoom.objects.get_or_create(
                name=room_name, defaults={"created_by": request.user}
            )
            if created:
                return JsonResponse({"status": "success", "message": "Room created."})
            else:
                return JsonResponse(
                    {"status": "error", "message": "Room already exists."}
                )
        return JsonResponse({"status": "error", "message": "Invalid data."})
    return JsonResponse({"status": "error", "message": "Invalid request method."})


@login_required
def user_messages(request, username):
    """
    Retrieve all messages sent by a specific user.
    """
    user = get_object_or_404(User, username=username)
    messages = ChatMessage.objects.filter(user=user).order_by("-timestamp")
    messages_data = [
        {"room_name": msg.room_name, "message": msg.message, "timestamp": msg.timestamp}
        for msg in messages
    ]
    return JsonResponse({"status": "success", "messages": messages_data})


@login_required
def delete_message(request, message_id):
    """
    Delete a specific message (only by its author).
    """
    message = get_object_or_404(ChatMessage, id=message_id)
    if message.user != request.user:
        return HttpResponseForbidden("You can only delete your own messages.")
    message.delete()
    return JsonResponse({"status": "success", "message": "Message deleted."})


@login_required
@require_POST
def leave_room(request):
    """
    Allow a user to leave a chat room.
    """
    data = json.loads(request.body)
    room_name = data.get("room_name")
    if not room_name:
        return JsonResponse({"status": "error", "message": "Room name required."})

    try:
        room = ChatRoom.objects.get(name=room_name)
        # If you have a membership model, remove the user from the room
        # Example: room.members.remove(request.user)
        return JsonResponse({"status": "success", "message": "Left the room."})
    except ChatRoom.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Room not found."})
