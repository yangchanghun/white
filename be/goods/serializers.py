from rest_framework import serializers
from .models import Product, ProductImage,Product_Name

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ('id', 'image_url')

    def get_image_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url)

# class ProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)

#     class Meta:
#         model = Product
#         fields = ('id', 'name', 'price', 'release_price', 'images')



# class ProductDetailSerializer(serializers.ModelSerializer):
#     product = ProductSerializer(many=True, read_only=True)
#     class Meta:
#         model = Product_Name
#         fields = ('id','name','model_number', 'product')


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'name','price', 'release_price', 'primary_color', 'size', 'full_name','images')

class ProductDetailSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)  # `source` 제거

    class Meta:
        model = Product_Name
        fields = ('id', 'name', 'model_number', 'products')
        
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('product', 'image')

class ProductListSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = Product_Name
        fields = ('id', 'name', 'images', 'price')

    def get_images(self, obj):
        # Product_Name에 연결된 모든 Product의 첫 번째 이미지를 가져옵니다.
        products = obj.products.all()
        images = ProductImage.objects.filter(product__in=products)
        return ProductImageSerializer(images, many=True, context=self.context).data

    def get_price(self, obj):
        # Product_Name에 연결된 Product의 가격 중 가장 낮은 가격을 가져옵니다.
        prices = obj.products.values_list('price', flat=True)
        if prices:
            return min(prices)
        return None