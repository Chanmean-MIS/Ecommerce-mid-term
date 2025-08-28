from django.shortcuts import render


# Create your views here.
def home(request):
    context = {
        'title': 'home'
    }
    return render(request, 'index.html', context)

def shop(request):
    context = {
        'title': 'shop'
    }
    return render(request, 'shop.html', context)

def contact(request):
    context = {
        'title': 'contact'
    }
    return render(request, 'contact.html', context)

def cart(request):
    context = {
        'title': 'cart'
    }
    return render(request, 'cart.html', context)

def checkout(request):
    context = {
        'title': 'checkout'
    }
    return render(request, 'checkout.html', context)

def blog(request):
    context = {
        'title': 'blog'
    }
    return render(request, 'blog.html', context)

def about(request):
    context = {
        'title': 'about'
    }
    return render(request, 'about.html', context)
