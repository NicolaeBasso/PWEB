from django.db import models
from django.contrib.auth.models import AbstractUser


class SiteUser(AbstractUser):
    created_at = models.DateTimeField(auto_now_add=True)
    subscriptions = models.ManyToManyField('SiteUser', related_name='subscribers')
    is_editor = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=True)
    author = models.ForeignKey(SiteUser, on_delete=models.CASCADE)
    is_protected = models.BooleanField(default=False)
    protection_password = models.CharField(max_length=200, blank=True)

    # Create the post url automatically based on the id of the post
    def get_absolute_url(self):
        return "/post/%i/" % self.id

    def __str__(self):
        return self.title
