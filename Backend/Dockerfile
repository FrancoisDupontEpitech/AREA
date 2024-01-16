#FROM python:3.8

# Créez un répertoire de travail
#WORKDIR /app

# Copiez le fichier requirements.txt dans le conteneur
#COPY requirements.txt /app/

# Installez les dépendances Python
#RUN pip install --no-cache-dir -r requirements.txt

# Copiez le reste des fichiers de votre projet dans le conteneur
#COPY init.sh /app/init.sh

#RUN chmod +x /app/init.sh


# Définir le script d'initialisation comme point d'entrée
#ENTRYPOINT ["bash", "/app/init.sh"]

FROM python:3.8.3-alpine

WORKDIR /app

RUN python3 -m venv env
RUN source env/bin/activate


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN apk add --no-cache musl-dev gcc
RUN python -m pip install django
RUN python -m pip install PyJWT
RUN python -m pip install python-decouple
RUN python -m pip install djangorestframework
RUN python -m pip install django-rest-swagger
RUN python -m pip install django-cors-headers
RUN python -m pip install tzdata
COPY ./ ./

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]