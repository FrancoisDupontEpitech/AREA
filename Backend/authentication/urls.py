from django.urls import path
from .views import register, logincustom, github, twitch, spotify, google

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', logincustom, name='login'),
    path('github/', github, name='github'),
    path('twitch/', twitch, name='twitch'),
    path('spotify/', spotify, name='spotify'),
    path('google/', google, name='google')
    # Autres URLs de l'application
]