#!/bin/bash

# Create a virtual environment
python3 -m venv env

# Activate the virtual environment
source env/bin/activate

# Run the Django development server
python manage.py runserver 0.0.0.0:8000
