from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import BooleanField, CharField, DateField, DateTimeField, TimeField

# create the database classes
class Client(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    school = models.CharField(max_length=255)
    programme = models.CharField(max_length=255)
    objects = models.Manager()
    
class Appointment(models.Model):
    id = models.AutoField(primary_key=True)
    appointment_date = DateField()
    appointment_time = TimeField()
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    added_on = DateTimeField(auto_now_add=True)
    objects = models.Manager()
    
class CounsellingAssessment(models.Model):
    id = models.AutoField(primary_key=True)
    appointment_id = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    attendance = BooleanField()
    intakeDate = DateField()
    status = CharField(max_length=50)
    case_category = CharField(max_length=100)
    remarks = CharField(max_length=100)
