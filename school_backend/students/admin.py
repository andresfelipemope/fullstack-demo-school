from django.contrib import admin
from .models import Student, StudentGroup

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('code', 'full_name', 'email', 'group')
    search_fields = ('code', 'full_name', 'email')
    list_filter = ('group',)

@admin.register(StudentGroup)
class StudentGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'room_number')
    search_fields = ('name',)
