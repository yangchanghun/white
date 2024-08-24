# views.py
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import Photoserializers
from rest_framework import status

from rest_framework.permissions import AllowAny


class Image_list(APIView):
    permission_classes = [AllowAny]  # 인증된 사용자만 접근 가능

    def post(self, request, format=None):
        serializers = Photoserializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
