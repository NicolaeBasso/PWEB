"""pweb_lab5 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from base.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),

    path('create/', add_post, name='add_post'),
    path('post/<int:post_id>/', view_post, name='view_post'),
    path('post/<int:post_id>/edit/', edit_post, name='edit_post'),
    path("post/<int:post_id>/delete/", delete_post, name="delete_post"),
    path('post/<int:post_id>/input_password/', input_password, name='input_password'),

    path("register/", register_request, name="register"),
    path("login/", login_request, name="login"),
    path("logout/", logout_request, name="logout"),

    path("profile/", view_profile, name="profile"),
    path("profile/<int:user_id>/", view_profile, name="profile"),
    path("profile/<int:user_id>/subscribe/", subscribe, name="subscribe"),
    path("profile/<int:user_id>/unsubscribe/", unsubscribe, name="unsubscribe"),

]
