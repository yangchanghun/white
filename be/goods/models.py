from django.db import models
from accounts.models import CustomUser  # CustomUser 모델을 사용한다고 가정
import uuid
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Size(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product_Name(models.Model):
    name = models.CharField(max_length=255)
    model_number = models.CharField(max_length=100, unique=True, null=True, blank=True)  # 모델 번호는 없어도 됩니다.

    def __str__(self):
        return self.name
    
class Like(models.Model):
    id = models.IntegerField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(CustomUser, related_name='likes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Product(models.Model):
    name = models.ForeignKey(Product_Name, on_delete=models.CASCADE, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    release_price = models.DecimalField(max_digits=10, decimal_places=2)
    release_date = models.DateField(null=True, blank=True)  # 출시일은 없어도 됩니다.
    primary_color = models.CharField(max_length=50, null=True, blank=True)  # 주요 컬러는 없어도 됩니다.
    categories = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
    brand = models.ForeignKey('Brand', on_delete=models.CASCADE, related_name='products', null=True, blank=True)  # 브랜드는 없어도 됩니다.
    tone = models.CharField(max_length=50, null=True, blank=True)  # 톤은 없어도 됩니다.
    season = models.CharField(max_length=50, null=True, blank=True)  # 계절은 없어도 됩니다.
    likes = models.ManyToManyField(Like, blank=True)
    likes_count = models.IntegerField(default=0)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, related_name='products')
    full_name = models.CharField(max_length=255, editable=False)  # 동적으로 생성되는 이름 필드

    def save(self, *args, **kwargs):
        # 'full_name' 필드를 동적으로 생성
        self.full_name = f"{self.name.name}_{self.size.name}_{self.primary_color}"
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.full_name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.product.name}"
