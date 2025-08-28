
from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name="home"),
    path('shop/', views.shop, name='shop'),
    path('contact/', views.contact, name='contact'),
    path('cart/', views.cart, name='cart'),
    path('chechout/', views.checkout, name='checkout'),
    path('blog/', views.blog, name='blog'),
    path('about/', views.about, name='about'),
]