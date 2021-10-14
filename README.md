## create virtual environment (env is the name of virtaul env)
python -m venv env

## activate virtual env
env\Scripts\activate 

## check the virtual environment 
import sys
print(sys.excutable)

## install all django libraries in project 
pip install -r requirements.txt

## import models to database (if changes are made in models)
python manage.py makemigrations
python manage.py migrate

## run the web app dev server
python manage.py runserver

## create superuser for backend
python manage.py createsuperuser

## open new terminal
## install all reactjs packages from package.json
cd mymfrontend
npm install 

## run reactjs app
cd mymfrontend
npm start
