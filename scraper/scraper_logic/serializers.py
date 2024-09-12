from rest_framework import serializers
from .models import Tender
from django.contrib.auth.models import User

# Serializer for the Tender model
class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender
        fields = '__all__'  # Serialize all fields from the Tender model

# Serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    # Specify that password should be write-only
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']  # Fields to be serialized

    def create(self, validated_data):
        # Create a user instance with the provided data
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data.get('email', '')  # Handle optional email field
        )
        # Set and hash the password before saving the user
        user.set_password(validated_data['password'])
        user.save()
        return user
