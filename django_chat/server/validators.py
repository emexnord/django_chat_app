import os
from django.core.exceptions import ValidationError
from PIL import Image

def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    for _  in range(10):
        print(ext)

    valid_extension = [".jpg", ".png",".jpeg", ".gif"]

    if not ext.lower() in valid_extension:
        raise ValidationError("unsupported file extension")