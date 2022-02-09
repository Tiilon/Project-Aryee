from django.db import models
import random
import uuid
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from pharm.models import Branch


def gen_id():
    new_id =  random.randrange(100, 10000)
    return new_id

ROLE = {
    ('MANAGER','MANAGER'),
    ('PHARMACIST','PHARMACIST'),
}

class Staff(models.Model):
    staffID = models.CharField(_('user id'), max_length=255, blank=True, null=True, default=gen_id)
    first_name = models.CharField(_('first name'), max_length=255, blank=True, null=True)
    last_name = models.CharField(_('last name'), max_length=255, blank=True, null=True)
    username = models.CharField(_('username'), max_length=255, blank=True, null=True)
    email = models.EmailField(_('email address'), max_length=255, blank=True, null=True, unique=True)
    contact = models.CharField(_('contact'), max_length=255, blank=True, null=True)
    gender = models.CharField(_('gender'), max_length=255, blank=True, null=True)
    branch = models.ForeignKey(Branch, blank=True, null=True, on_delete=models.DO_NOTHING)
    uuid = models.UUIDField(_('uuid'), default=uuid.uuid4, editable=False)
    role = models.CharField(_('role'), max_length=255, blank=True, null=True,default=ROLE)
    profile_image = models.TextField(_('profile image'), null=True, blank=True)
    is_active = models.BooleanField(default=True, blank=True, null=True)
    is_staff = models.BooleanField(default=True, blank=True, null=True)
    is_superuser = models.BooleanField(default=False, blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = 'staff'
        ordering = ('-date_joined',)

    def __str__(self):
        return f"{self.get_full_name()}"
