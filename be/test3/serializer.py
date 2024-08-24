from rest_framework import serializers
from .models import Image  # Photo 모델을 가져와야 합니다.

class Photoserializers(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'  # 모든 필드를 사용하도록 설정
