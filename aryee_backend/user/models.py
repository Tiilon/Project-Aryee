from django.db import models
from django.contrib.auth.base_user import BaseUserManager,AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
import uuid
import random
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Email must be provided')
        
        email= self.normalize_email(email)
        user = self.model(
            email=email, 
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.role = 'ADMIN'
        user.save(using=self.db)

        if not user.is_staff:
            raise ValueError('Superuser must be a staff member')
        if not user.is_superuser:
            raise ValueError('Superuser must be a superuser')
        
        return user

ROLE = {
    ('ADMIN','ADMIN'),
    ('MANAGER','MANAGER'),
    ('PHARMACIST','PHARMACIST'),
}

def gen_id():
    new_id =  random.randrange(100, 10000)
    return new_id

class User(AbstractBaseUser, PermissionsMixin):
    userID = models.CharField(_('user id'), max_length=255, blank=True, null=True, default=gen_id)
    first_name = models.CharField(_('first name'), max_length=255, blank=True, null=True)
    last_name = models.CharField(_('last name'), max_length=255, blank=True, null=True)
    username = models.CharField(_('username'), max_length=255, blank=True, null=True)
    email = models.EmailField(_('email address'), max_length=255, blank=True, null=True, unique=True)
    contact = models.CharField(_('contact'), max_length=255, blank=True, null=True)
    gender = models.CharField(_('gender'), max_length=255, blank=True, null=True)
    uuid = models.UUIDField(_('uuid'), default=uuid.uuid4, editable=False)
    role = models.CharField(_('role'), max_length=255, blank=True, null=True,default=ROLE)
    profile_image = models.TextField(_('profile image'), null=True, blank=True)
    is_active = models.BooleanField(default=True, blank=True, null=True)
    is_staff = models.BooleanField(default=True, blank=True, null=True)
    is_superuser = models.BooleanField(default=False, blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = 'user'
        ordering = ('-date_joined',)

    def __str__(self):
        return f"{self.get_full_name()}"