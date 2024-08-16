from rest_framework import generics
from .models import Product,Like,Product_Name
from .serializers import ProductSerializer,ProductDetailSerializer,ProductListSerializer
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from django.db.models import Subquery, OuterRef, Count



class ProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Product_Name.objects.all()
    serializer_class = ProductListSerializer
    # permission_classes = [AllowAny]
    # serializer_class = ProductSerializer

    # def get_queryset(self):
    #     # 각 Product_Name별로 좋아요 수가 가장 많은 Product를 가져옵니다.
    #     subquery = Product.objects.filter(
    #         name=OuterRef('name')
    #     ).order_by('-likes_count', '-id').values('id')[:1]

    #     # Subquery를 이용해 각 Product_Name에 해당하는 대표 상품을 가져옵니다.
    #     queryset = Product.objects.filter(
    #         id__in=Subquery(subquery)
    #     )

    #     return queryset



def product_like(request, pk):   
    product = Product.objects.get(pk=pk)

    if not product.likes.filter(created_by=request.user):
        like = Like.objects.create(created_by=request.user)
        product = Product.objects.get(pk=pk)
        product.likes_count = product.likes_count + 1
        product.likes.add(like)
        product.save()

        return JsonResponse({'message': 'like created'})
    else:
        like = Like.objects.filter(created_by=request.user, post=pk).first()
        product = Product.objects.get(pk=pk)
        product.likes.remove(like)
        product.likes_count = product.likes_count - 1
        product.save()
        like.delete()

        return JsonResponse({'message': 'like canceled'})
    
def check_liked(request, pk):
    product = Product.objects.get(pk=pk)
    me = request.user
    is_liked = Like.objects.filter(created_by=me, product=product).exists()
    return JsonResponse({'isLiked': is_liked})


class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Product_Name.objects.all()
    serializer_class = ProductDetailSerializer

