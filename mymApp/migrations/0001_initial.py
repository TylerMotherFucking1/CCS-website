# Generated by Django 3.2.7 on 2021-09-26 08:38

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('school', models.CharField(max_length=255)),
                ('programme', models.CharField(max_length=255)),
            ],
            managers=[
                ('object', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('appointment_date', models.DateField()),
                ('appointment_time', models.TimeField()),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('client_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mymApp.client')),
            ],
            managers=[
                ('object', django.db.models.manager.Manager()),
            ],
        ),
    ]