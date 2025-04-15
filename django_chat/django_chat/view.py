from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import ChatMessage
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


# @login_required
# def get_messages(request, room_name):
#     """
#     Retrieve chat messages for a specific room.
#     """
#     messages = ChatMessage.objects.filter(room_name=room_name).order_by('timestamp')
#     messages_data = [
#         {'user': msg.user.username, 'message': msg.message, 'timestamp': msg.timestamp}
#         for msg in messages
#     ]
#     return JsonResponse({'status': 'success', 'messages': messages_data})
