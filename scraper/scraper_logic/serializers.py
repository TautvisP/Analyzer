from rest_framework import serializers
from .models import Tender

class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender
        fields = '__all__'  # or specify the fields you want to include
