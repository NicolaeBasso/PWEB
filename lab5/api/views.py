from http.client import HTTPException

from django.contrib import messages
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect

from base.forms import NewUserForm, NewPostForm, InputPasswordForm
from base.models import Post, SiteUser


# The main view where the users can see all the post objects
def index(request):
    posts = Post.objects.filter(is_public=True)
    user = None
    private_posts = None
    if request.user.is_authenticated:
        user = SiteUser.objects.get(id=request.user.id)

        subscribed_users = user.subscriptions.all()
        private_posts = []
        for subscriber in subscribed_users:
            private_posts.extend(subscriber.post_set.filter(is_public=False))

    context = {
        'posts': posts,
        'user': user,
        'private_posts': private_posts,
    }
    return render(request, 'index.html', context)


# The post view template where the users can see the post
def view_post(request, post_id, password=None):
    post = Post.objects.get(id=post_id)
    user = None
    if request.user.is_authenticated:
        user = SiteUser.objects.get(id=request.user.id)

    if post.is_protected and (request.user.id != post.author.id) and (user is None or not user.is_editor):
        if password is None:
            return redirect("input_password", post_id=post_id)
        elif post.protection_password != password:
            messages.error(request, "Invalid password.")
            return redirect("input_password", post_id=post_id)

    context = {
        'post': post,
        'is_editor': (user is not None) and (user.is_editor or user.id == post.author.id),
    }
    return render(request, 'view_post.html', context)


def input_password(request, post_id):
    if request.method == "POST":
        password = request.POST["protection_password"]
        return view_post(request, post_id, password)

    else:
        form = InputPasswordForm()
        return render(request, "input_password.html", {"form": form})


def login_request(request):
    # Check if the user is not authenticated
    if request.user.is_authenticated:
        return redirect('index')
    message = ''
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}.")
                return redirect("index")
            else:
                message = "Invalid username or password."
                messages.error(request, "Invalid username or password.")
        else:
            message = "Invalid username or password."
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request=request, template_name="login.html", context={"login_form": form, "message": message})


def logout_request(request):
    logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect("index")


def edit_post(request, post_id):
    # Check user permisisons
    if request.user.is_authenticated:
        post = Post.objects.get(id=post_id)
        current_user = SiteUser.objects.get(id=request.user.id)
        if post.author.id == request.user.id or current_user.is_editor:
            if request.method == "POST":
                form = NewPostForm(request.POST)
                if form.is_valid():
                    form.update(post)
                    messages.success(request, "Update successful.")
                    return redirect("view_post", post_id=post.id)

                messages.error(request, "Unsuccessful update. Invalid information.")
                return redirect("edit_post", post_id=post_id)

            form = NewPostForm()
            form.fields['title'].initial = post.title
            form.fields['content'].initial = post.content
            form.fields['is_public'].initial = post.is_public
            form.fields['is_protected'].initial = post.is_protected
            form.fields['protection_password'].initial = post.protection_password

            return render(request=request, template_name="edit_post.html", context={"update_form": form})
        return redirect("view_post", post_id=post_id)

    # Else redirect to the login page
    return redirect('login')


def add_post(request):
    # Check user permissions
    if request.user.is_authenticated:
        if request.method == "POST":
            post = Post()
            post.title = request.POST["title"]
            post.content = request.POST["content"]
            post.author = request.user
            post.is_public = request.POST["is_public"] == "on" if "is_public" in request.POST else False
            post.is_protected = request.POST["is_protected"] == "on" if "is_protected" in request.POST else False
            post.protection_password = request.POST["protection_password"]
            post.save()
            messages.success(request, "Post added successfully.")
            return redirect("index")

        form = NewPostForm()
        return render(request=request, template_name="add_post.html", context={"add_form": form})

    # Else redirect to the index
    return redirect('index')


def create_post_request(request):
    # Check user permissions
    if request.user.is_authenticated:
        try:
            created_obj = Post.objects.create(
                title=request.POST['title'],
                body=request.POST['body'],
                is_public=request.POST['is_public'] == 'on',
                author=SiteUser.objects.get(id=request.user.id)
            )
            return redirect('view_post', post_id=created_obj.id)
        except:
            # raise 422 http error
            raise HTTPException(422)

    # Else redirect to the index
    return redirect('index')


def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            user_obj = SiteUser.objects.get(id=user.id)
            user_obj.subscriptions.add(user_obj)
            messages.success(request, "Registration successful.")
            return redirect("index")
        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render(request=request, template_name="register.html", context={"register_form": form})


def delete_post(request, post_id):
    # Check if the user is the author
    if request.user.is_authenticated:
        post = Post.objects.get(id=post_id)
        user = SiteUser.objects.get(id=request.user.id)
        if post.author == request.user or user.is_editor:
            post.delete()
            messages.success(request, "Post deleted successfully.")

    return redirect("index")


def view_profile(request, user_id=None):
    if user_id is None:
        user_id = request.user.id

    if request.user.is_authenticated:
        # if user_id == request.user.id:
        requested_user = SiteUser.objects.get(id=user_id)
        current_user = SiteUser.objects.get(id=request.user.id)
        is_user_subscriber = current_user.subscriptions.filter(id=requested_user.id).exists()
        return render(request, 'profile.html',
                      {'requested_user': requested_user,
                       'posts': Post.objects.filter(is_public=True, author=requested_user),
                       'is_user_subscriber': is_user_subscriber,
                       'subscribed_posts': Post.objects.filter(
                           is_public=False, author=requested_user) if is_user_subscriber else None})
    messages.info(request, "Login to view other profiles.")
    return redirect("index")


def subscribe(request, user_id):
    user = SiteUser.objects.get(id=request.user.id)
    user.subscriptions.add(SiteUser.objects.get(id=user_id))
    messages.success(request, "Subscribed successfully.")
    return redirect("profile", user_id=user_id)


def unsubscribe(request, user_id):
    user = SiteUser.objects.get(id=request.user.id)
    user.subscriptions.remove(SiteUser.objects.get(id=user_id))
    messages.success(request, "Unsubscribed successfully.")
    return redirect("profile", user_id=user_id)
