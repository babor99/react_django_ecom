from django.http import response
from rest_framework import serializers
from rest_framework.authtoken.models import Token 
from django.contrib.auth import get_user_model


from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        depth = 1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email']
        extra_kwargs = {'password':{'write_only':True, 'required':True}} 

    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image', ]
        read_only_fields = ['prouser',]

        # def validate(self, attrs):
        #     attrs['prouser'] = self.context['request'].user
        #     return attrs
        
        # def to_representation(self, instance):
        #     response = super().to_representation(instance)
        #     response['prouser'] = UserSerializer(instance.prouser).data
        #     return response

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class OldOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        depth = 1
    
    # def to_representaiton(self, instance):
    #     response = super().to_representation(instance)
    #     response['cart'] = CartSerializer(instance.cart).data
    #     return response