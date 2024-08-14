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