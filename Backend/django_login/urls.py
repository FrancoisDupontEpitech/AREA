"""
URL configuration for django_login project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
 
from authentication.views import UserViewset, Services_listViewset, Actions_listViewset, Reactions_listViewset, AREA_tableViewset, My_AREA_tableViewset

router = routers.SimpleRouter()

router.register('users', UserViewset, basename='users')
router.register('services', Services_listViewset, basename='services')
router.register('actions', Actions_listViewset, basename='actions')
router.register('reactions', Reactions_listViewset, basename='reactions')
router.register('areas', AREA_tableViewset, basename='areas')
router.register('myareas', My_AREA_tableViewset, basename='myareas')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('api/', include(router.urls))
 ]