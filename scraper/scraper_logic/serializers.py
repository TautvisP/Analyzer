from rest_framework import serializers
from .models import Tender
from django.contrib.auth.models import User

class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender
        fields = '__all__'  # or specify the fields you want to include

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']  # Include fields as needed

    def create(self, validated_data):
        # Create the user with a hashed password
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data.get('email', '')  # Optional: handle email
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user