from django.urls import path
from .views import ProductListView,product_like,check_liked,ProductDetailView

urlpatterns = [
    path('list', ProductListView.as_view(), name='product-list'),
    path('<int:pk>/like/', product_like, name='post_like'),
    path('<int:pk>/likestatus/', check_liked, name='check_liked'),
    path('product/<int:pk>/', ProductDetailView.as_view(), name='product_detail'),
]

