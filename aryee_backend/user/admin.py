from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import *


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = (
        (_('login'), {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('userID','first_name', 'last_name', 'username', 'role', 'gender', 'profile_image')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important Dates'), {'fields': ('date_joined',)})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2')
        }),
    )

    list_display = ('userID', 'first_name', 'last_name', 'role')

    search_fields = ('first_name', 'last_name')
    ordering = ('-date_joined',)