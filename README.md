## create virtual environment (env is the name of virtaul env)
python -m venv env

## activate virtual env
env\Scripts\activate 

## check the virtual environment 
import sys
print(sys.excutable)

## install all django libraries in project 
pip install -r requirements.txt

## run the web app dev server
python manage.py runserver

## import models to database (if changes are made in models)
python manage.py makemigrations
python manage.py migrate

## create superuser
python manage.py cretesuperuser

## install all reactjs packages from package.json
npm install 

## run reactjs app
cd mymfrontend
npm start
