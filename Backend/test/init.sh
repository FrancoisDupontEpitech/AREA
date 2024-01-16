#!/bin/bash

# Attendre que la base de données soit prête (assurez-vous que votre conteneur de base de données est démarré et prêt)
sleep 10

# Exécuter les migrations
rm db.sqlite3  # Supprimer la base de données existante
python manage.py makemigrations
python manage.py migrate

# Démarrer le serveur Django
python manage.py runserver 0.0.0.0:8000