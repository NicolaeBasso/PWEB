from django import forms
from django.contrib.auth.forms import UserCreationForm

# Create your forms here.
from base.models import SiteUser, Post


class NewUserForm(UserCreationForm):
    email = forms.EmailField(required=True)
    is_editor = forms.BooleanField(required=False)

    class Meta:
        model = SiteUser
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(NewUserForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        user.is_editor = self.cleaned_data['is_editor']
        if commit:
            user.save()
        return user


class NewPostForm(forms.Form):
    title = forms.CharField(max_length=100)
    content = forms.CharField(widget=forms.Textarea)
    is_public = forms.BooleanField(required=False)
    is_protected = forms.BooleanField(required=False)
    protection_password = forms.CharField(max_length=50, required=False)

    def save(self, user):
        post = Post(title=self.cleaned_data['title'], content=self.cleaned_data['content'], author=user,
                    is_public=self.cleaned_data['is_public'], is_protected=self.cleaned_data['is_protected'],
                    protection_password=self.cleaned_data['protection_password'])
        post.save()
        return post

    def update(self, post):
        post.title = self.cleaned_data['title']
        post.content = self.cleaned_data['content']
        post.is_public = self.cleaned_data['is_public']
        post.is_protected = self.cleaned_data['is_protected']
        post.protection_password = self.cleaned_data['protection_password']
        post.save()


class InputPasswordForm(forms.Form):
    protection_password = forms.CharField(widget=forms.PasswordInput)
