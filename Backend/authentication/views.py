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
from rest_framework import status

def generate_jwt_token(username, password):
    payload = {
        'username': username,  # include any data needed here
        'password': password,
    }
    secret_key = username     # Define a secret key for signing the token
    token = jwt.encode(payload, secret_key, algorithm='HS256')     # Generate the JWT token

    return token

@csrf_exempt
def logincustom(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))  # Désérialisez les données JSON
        
        print("data", data)
        
        password = data.get('password')
        username = data.get('username')

        if Users.objects.filter(username=username).exists():
            specific_entry = Users.objects.get(username=username)
            if specific_entry.password == password:
                return JsonResponse({'token': specific_entry.token}, status=200)
            else:
                return JsonResponse({'error': 'Identifiants invalides'}, status=400)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))  # Désérialisez les données JSON
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Vous pouvez ajouter des validations ici
        if Users.objects.filter(username=username).exists():        ##used to be User
            return JsonResponse({'error': 'Username already taken'}, status=400)

        jwt_token = generate_jwt_token('username', 'password')
        
        Users.objects.create(username=username, email=email, password=password, token=jwt_token, googleauth_id=";", Twitch_token=";", Spotify_token=";", Github_token=";")

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
    queryset = AREA_table.objects.all()

    def get_queryset(self):
         return AREA_table.objects.all()

#     def create(self,request):
#         data = request.data
#         authorization_header = request.META.get('Authorization')
#         user_line = Users.objects.get(token=authorization_header)

#         data.userID = user_line.userID
#         serializer=AREA_tableSerializer(data=request.data)
#         return AREA_table.objects.all()



    def create(self, request):
        data = request.data
        authorization_header = request.META.get('HTTP_AUTHORIZATION')

        try:
            user = Users.objects.get(token=authorization_header)
        except Users.DoesNotExist:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        data['userID'] = user.id
        serializer = AREA_tableSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class My_AREA_tableViewset(ModelViewSet):
 
    serializer_class = My_AREA_tableSerializer
    def get_queryset(self):
        return AREA_table.objects.all()

import requests

def github(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        code = data.get('code')
        client_id = 'd7c82b09f58de0cdc0b2'
        client_secret = '8f44e7b899ab104afe6913e8b25ea7b45765eb04'
        url = 'https://github.com/login/oauth/access_token'
        headers = {
            'Accept': 'application/json'
        }
        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
        }
        response = requests.post(url, data=data, headers=headers)
        print(response)
        BearerToken = json.loads(response.text)['access_token']
        return JsonResponse( {'': ''}, status=200)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

def twitch(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        code = data.get('code')
        url = 'https://id.twitch.tv/oauth2/token'
        client_id = 'bthrygm14dnmz04ggw23vh63dmfxa8'
        client_secret = '9ekyao82ccv3i0ys072sae9dwks9gw'
        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:8081'
        }
        response = requests.post(url, data=data)
        print(response)
        BearerToken = json.loads(response.text)['access_token']
        return JsonResponse( {'': ''}, status=200)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

def spotify(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        code = data.get('code')
        url = 'https://accounts.spotify.com/api/token'
        client_id = '1d3ce8c346ce49178fcaf53483366483'
        client_secret = 'cf2341d8f100446dad2c75da5c6274dd'
        data = {
            'code': code,
            'redirect_uri': 'http://localhost:8081',
            'grant_type': 'authorization_code',
            'client_id': client_id,
            'client_secret': client_secret
        }
        response = requests.post(url, data=data)
        print(response)
        BearerToken = json.loads(response.text)['access_token']
        return JsonResponse( {'': ''}, status=200)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

def google(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        code = data.get('code')
        url = 'https://accounts.google.com/o/oauth2/token'
        client_id = '378922446474-nlffrd9vsmvgkv53go96r6nh2ip63ds5.apps.googleusercontent.com'
        client_secret = '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'
        data = {
            'code': code,
            'redirect_uri': 'http://localhost:8081',
            'grant_type': 'authorization_code',
            'client_id': client_id,
            'client_secret': client_secret
        }
        response = requests.post(url, data=data)
        print(response)
        BearerToken = json.loads(response.text)['access_token']
        baseurl = 'https://www.googleapis.com/oauth2/v3/userinfo'
        header = {
            'Authorization': 'Bearer ' + BearerToken
        }
        res = requests.get(baseurl, headers=header)
        print(res)
        username = res.json()['given_name']
        email = res.json()['email']

        if Users.objects.filter(username=username).exists():
            line = Users.objects.get(username=username)
            line.googleauth_id='Bearer ' + BearerToken
            return JsonResponse({'token': line.token}, status=200)
        else :
            jwt_token = generate_jwt_token('username', 'email')
            Users.objects.create(username=username, email=email, password=";", token=jwt_token, googleauth_id='Bearer ' + BearerToken, Twitch_token=";", Spotify_token=";", Github_token=";")
            return JsonResponse( {'token': jwt_token}, status=201)
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)