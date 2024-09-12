from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class Tender(models.Model):
    title = models.CharField(max_length=255)
    bidder_name = models.CharField(max_length=255)
    bidder_link = models.URLField()
    purchase_type = models.CharField(max_length=100)
    announcement_type = models.CharField(max_length=100)
    publication_date = models.DateField()
    submission_deadline = models.DateField()
    cpv_code = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
class User(AbstractUser):
    email = models.EmailField(max_length=254, blank=True, null=True)

    # Adding related_name to avoid clashes with the default User model
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.'
    )