



from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import jwt
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
  
from authentication.models import Services_list, Actions_list, Reactions_list, Users, AREA_table
from authentication.serializers import Services_listSerializer, Actions_listSerializer, Reactions_listSerializer, UsersSerializer, AREA_tableSerializer, My_AREA_tableSerializer




def generate_jwt_token(username):
    # Define the payload (claims) for the JWT
    payload = {
        'username': username,  # include any data needed here
    }
    secret_key = 'your-secret-key'    # Define a secret key for signing the token
    token = jwt.encode(payload, secret_key, algorithm='HS256')     # Generate the JWT token

    return token

@csrf_exempt
def logincustom(request):
    print("bonjour")
    if request.method == 'POST':
        print("bonsoir")
        data = json.loads(request.body.decode('utf-8'))  # Désérialisez les données JSON
        print("data",data)
        password = data.get('password')
        username = data.get('username')
        print("============")
        print("password",password)
        print("username",username)
        print("============")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            jwt_token = generate_jwt_token(data.get('username'))
            return JsonResponse({'token': jwt_token}, status=200)
        else:
            return JsonResponse({'error': 'Identifiants invalides'}, status=400)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))  # Désérialisez les données JSON
        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')

        # Vous pouvez ajouter des validations ici
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already taken'}, status=400)

        # Créez un nouvel utilisateur
        user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name,email=email, password=password)

        # Connectez automatiquement l'utilisateur après l'inscription
        login(request, user)
        jwt_token = generate_jwt_token(data.get('username'))
        return JsonResponse( {'token': jwt_token}, status=200)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)



class Actions_listViewset(ModelViewSet):

    serializer_class = Actions_listSerializer

    def get_queryset(self):
        return Actions_list.objects.all()

class Reactions_listViewset(ModelViewSet):

    serializer_class = Reactions_listSerializer

    def get_queryset(self):
        return Reactions_list.objects.all()

class Services_listViewset(ModelViewSet):

    serializer_class = Services_listSerializer

    def get_queryset(self):
        return Services_list.objects.all()

class UserViewset(ModelViewSet):

    serializer_class = UsersSerializer

    def get_queryset(self):
        return User.objects.all()

class AREA_tableViewset(ModelViewSet):

    serializer_class = AREA_tableSerializer

    def get_queryset(self):
        return AREA_table.objects.all()

class My_AREA_tableViewset(ModelViewSet):
 
    serializer_class = My_AREA_tableSerializer
    def get_queryset(self):
        return AREA_table.objects.all()