# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('images/', views.Image_list.as_view(), name='image_list'),
    # 다른 URL 패턴들...
]