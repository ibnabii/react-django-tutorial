import random
import string

from django.db import models


def generate_unique_code():
    length = 6

    while True:
        code = "".join(random.choices(string.ascii_uppercase, k=length))
        if not Room.objects.filter(code=code).exists():
            break
    return code


class Room(models.Model):
    code = models.CharField(max_length=8, unique=True, default=generate_unique_code)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(default=False, null=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code
