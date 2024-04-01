from django.urls import path
from . import views


urlpatterns = [
    path('test', views.mlp),
    path('test2', views.test),
    path('update', views.update)
]