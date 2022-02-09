from django.db import models
import random
from user.models import User
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


def gen_id():
    new_id =  random.randrange(100, 10000)
    return new_id

ROLE = {
    ('MANAGER','MANAGER'),
    ('PHARMACIST','PHARMACIST'),
}

class Branch(models.Model):
    name = models.CharField(_('name'), max_length=255, blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'branch'
        ordering = ('-created_at',)

    def __str__(self):
        return f"{self.name}"
