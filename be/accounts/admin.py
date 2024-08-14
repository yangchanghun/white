from django.contrib import admin
from .models import CustomUser
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin  # 올바른 임포트 경로

# Register your models here.
admin.site.register(CustomUser)

try:
    admin.site.register(OutstandingToken, OutstandingTokenAdmin)
except admin.sites.AlreadyRegistered:
    pass
