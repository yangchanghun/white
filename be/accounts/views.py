from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated  # AllowAny 임포트

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "register success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
            
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            
            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            res = Response(
                {
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                    "user_info": {
                        "user_id": user.id,
                        "email": user.email,    
                    }
                },
                status=status.HTTP_200_OK,
            )

            # 쿠키에 토큰 저장
            res.set_cookie(
                "access", 
                access_token, 
                httponly=True, 
                secure=True,  # 반드시 HTTPS를 통해 전달되어야 함
                samesite='none',
                path='/',
            )
            res.set_cookie(
                "refresh", 
                refresh_token, 
                httponly=True, 
                secure=True,  # 반드시 HTTPS를 통해 전달되어야 함
                samesite='none',
                path='/',
            )

            return res
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)    


class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # 쿠키에서 토큰을 삭제하여 로그아웃 처리
        res = Response({"message": "logout success"}, status=status.HTTP_200_OK)
        res.delete_cookie('access', path='/', domain=None, samesite='None')
        res.delete_cookie('refresh', path='/', domain=None, samesite='None')

        return res

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

class VerifyTokenAPIView(APIView):
    permission_classes = []  # 이 엔드포인트는 인증이 필요하지 않습니다.

    def post(self, request):
        access_token = request.COOKIES.get('access')
        if access_token is None:
            return Response({'detail': 'No token provided'}, status=401)
        
        try:
            # 토큰 유효성 검사
            token = AccessToken(access_token)
            return Response({'detail': 'Token is valid'}, status=200)
        except Exception as e:
            return Response({'detail': str(e)}, status=401)