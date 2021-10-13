
from django.db.models import query
from rest_framework import generics
from rest_framework.serializers import Serializer
from mymApp.serializers import AppointmentSerializer, ClientSerializer, CounsellingAssessmentSerializer
from mymApp.models import Appointment, Client, CounsellingAssessment
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.


class ClientViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    # GET method
    def list(self, request):
        # get client from database
        client = Client.objects.all()
        serializer = ClientSerializer(client, many=True, context = {"request":request})
        # format the response json
        response_dict = {"error":False, "message":"All client list data", "data": serializer.data}
        return Response(response_dict)
    
    def retrieve(self, request, pk=None):
        queryset = Client.objects.all()
        client = get_object_or_404(queryset, pk=pk)
        serializer = ClientSerializer(client, context={"request":request})
        
        serializer_data = serializer.data
        appointment_details = Appointment.objects.filter(client_id=serializer_data["id"])
        appointment_details_serializer = AppointmentSerializer(appointment_details, many=True)
        serializer_data['appointment_details'] = appointment_details_serializer.data
        
        assessment_details = CounsellingAssessment.objects.filter(client_id=serializer_data["id"])
        assessment_details_serializer = CounsellingAssessmentSerializer(assessment_details, many=True)
        serializer_data['assessment_details'] = assessment_details_serializer.data
        
        return Response({"error":False, "message":"Single client list data", "data": serializer_data})
    
    # POST method
    def create(self, request):
        try:
            serializer = ClientSerializer(data=request.data, context = {"request":request})
            serializer.is_valid()
            serializer.save()
            # format the response json
            response_dict = {"error":False, "message":"Data saved successfully"}
        except:
            response_dict = {"error":True, "message":"Failed to save data"}
            
        return Response(response_dict)
    
    # PUT method
    def update(self, request, pk=None):
        try:
            queryset = Client.objects.all()
            client = get_object_or_404(queryset, pk=pk)
            serializer = ClientSerializer(client, data=request.data, context={"request":request})
            serializer.is_valid()
            serializer.save()
            response_dict = {"error":False, "message":"Data updated successfully"}
        except:
            response_dict = {"error":True, "message":"Data updated failed"}
        return Response(response_dict)

class AppointmentViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    # PUT method
    def create(self, request):
        try:
            serializer = AppointmentSerializer(data=request.data, context = {"request":request})
            serializer.is_valid()
            serializer.save()
            
            # get the created client id
            serializer.data['id']
            # format the response json
            response_dict = {"error":False, "message":"Appointment saved successfully"}
        except:
            response_dict = {"error":True, "message":"Failed to save appointment"}
            
        return Response(response_dict)
    
    # GET method
    def list(self, request):
        # get appointment from database
        appointment = Appointment.objects.all()
        serializer = AppointmentSerializer(appointment, many=True, context = {"request":request})
        # format the response json
        response_dict = {"error":False, "message":"All appointment list data", "data": serializer.data}
        return Response(response_dict)
    
    def retrieve(self, request, pk=None):
        queryset = Appointment.objects.all()
        appointment = get_object_or_404(queryset, pk=pk)
        serializer = AppointmentSerializer(appointment, context={"request":request})
        
        serializer_data = serializer.data
        assessment_details = CounsellingAssessment.objects.filter(appointment_id=serializer_data["id"])
        assessment_details_serializer = CounsellingAssessmentSerializer(assessment_details, many=True)
        serializer_data['assessment_details'] = assessment_details_serializer.data
        
        return Response({"error":False, "message":"Single appointment list data", "data": serializer_data})
    
    # PUT method
    def update(self, request, pk=None):
        try:
            queryset = Appointment.objects.all()
            appointment = get_object_or_404(queryset, pk=pk)
            serializer = AppointmentSerializer(appointment, data=request.data, context={"request":request})
            serializer.is_valid()
            serializer.save()
            response_dict = {"error":False, "message":"Appointment updated successfully"}
        except:
            response_dict = {"error":True, "message":"Appointment updated failed"}
        return Response(response_dict)
    
class ClientNameViewSet(generics.ListAPIView):
    serializer_class = ClientSerializer
    def get_queryset(self):
        name = self.kwargs['name']
        return Client.objects.filter(name = name)
    
class CounsellingAssessmentViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    # PUT method
    def create(self, request):
        try:
            serializer = CounsellingAssessmentSerializer(data=request.data, context = {"request":request})
            serializer.is_valid()
            serializer.save()
            # format the response json
            response_dict = {"error":False, "message":"Assessment saved successfully"}
        except:
            response_dict = {"error":True, "message":"Failed to save assessment"}
            
        return Response(response_dict)
    
    # GET method
    def list(self, request):
        # get appointment from database
        counsellingAssess = CounsellingAssessment.objects.all()
        serializer = CounsellingAssessmentSerializer(counsellingAssess, many=True, context = {"request":request})
        # format the response json
        response_dict = {"error":False, "message":"All appointment list data", "data": serializer.data}
        return Response(response_dict)
    
    def retrieve(self, request, pk=None):
        queryset = CounsellingAssessment.objects.all()
        counsellingAssess = get_object_or_404(queryset, pk=pk)
        serializer = CounsellingAssessmentSerializer(counsellingAssess, context={"request":request})
        return Response({"error":False, "message":"Single assessment list data", "data": serializer.data})
    
    # PUT method
    def update(self, request, pk=None):
        try:
            queryset = CounsellingAssessment.objects.all()
            counsellingAssess = get_object_or_404(queryset, pk=pk)
            serializer = CounsellingAssessmentSerializer(counsellingAssess, data=request.data, context={"request":request})
            serializer.is_valid()
            serializer.save()
            response_dict = {"error":False, "message":"Assessment updated successfully"}
        except Exception as e:
            print(e)
            response_dict = {"error":True, "message":"Assessment updated failed"}
        return Response(response_dict)
   
client_list = ClientViewSet.as_view({"get", "list"})
client_create = ClientViewSet.as_view({"post", "create"})
client_update = ClientViewSet.as_view({"put", "update"})