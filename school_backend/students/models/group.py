from django.db import models

class StudentGroup(models.Model):
    name = models.CharField(max_length=100)
    room_number = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} (Room {self.room_number})"
