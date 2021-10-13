from rest_framework import serializers
from mymApp.models import Appointment, Client, CounsellingAssessment

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        # returns all attributes form model
        fields = "__all__"
        
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"
        
    def to_representation(self, instance):
        # override the to_representation to add extra key with client data
        response = super().to_representation(instance)
        return response
    
class CounsellingAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CounsellingAssessment
        fields = "__all__"
        
    def to_representation(self, instance):
        # override the to_representation to add extra key with client data
        response = super().to_representation(instance)
        return response