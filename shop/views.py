from rest_framework import generics, mixins, views, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
import json

from .serializers import *
from .models import *

# Create your views here.

class RegisterView(views.APIView):
    def post(self, request):
        new_username = request.data['username']
        new_email = request.data['email']
        password = request.data['password']
        users = User.objects.all()
        for user in users:
            if user.username == new_username or user.email == new_email:
                return Response({'error':True, 'message':f"username '{new_username}' or email '{new_email}' already exists. Try with another username or email."})              
        else:
            user = User.objects.create_user(username=new_username, email=new_email, password=password,
            )
            Token.objects.create(user=user)
            Profile.objects.create(prouser=user)
            return Response({'error':False,'message':"User registration is successfull"})


class ProductView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    lookup_field = 'id'

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)


class CategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True, context={'request':request})
        return Response({'error':False, 'message':'All Category list', 'data':serializer.data })

    def retrieve(self, request, pk=None):
        queryset = Category.objects.get(id=pk)
        serializer = CategorySerializer(queryset, context={'request':request})

        category = serializer.data
        cat_prod_list = []
        cat_id = serializer.data['id']
        cat_products = Product.objects.filter(category__id=cat_id)
        cat_products_serializer = ProductSerializer(cat_products, many=True)
        category['category_products'] = cat_products_serializer.data
        cat_prod_list.append(category)
        
        return Response({'error':False, 'message':'Single Category', 'data':cat_prod_list })


class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        try:
            query = Profile.objects.get(prouser=request.user)
            serializer = ProfileSerializer(query)
            profile_data = serializer.data

            user = User.objects.get(username=request.user.username)
            user_data = UserSerializer(user).data

            profile_data['prouser'] = user_data

            response_msg = {'error':False, 'message':'Profile data fetched successfully', 'data':profile_data}
        except:
            response_msg = {'error':True, 'message':'Error during fetching Profile data'}
        return Response(response_msg)

    def post(self, request):
        user = User.objects.get(id=request.data['id'])
        if user:
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.email = request.data['email']
            user.save()
            print('user exists')
            return Response({'message': 'user data updated successfully'})
        return Response({'message': "user data didn't updated"})


class UpdateProfileImageView(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    
    def post(self, request):
        prouser = Profile.objects.get(prouser=request.user)
        if prouser:
            profile_serializer = ProfileSerializer(prouser, data=request.data, context={'request':request} )
            profile_serializer.is_valid()
            profile_serializer.save()
            return Response({'message': 'profile data saved successfully'})
        return Response({'message': "didn't save profile data"})


class PlaceOrderView(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self, request):
        try:
            user = request.user
            customer = Profile.objects.get(prouser=user)

            cart_obj = Cart.objects.create(customer=customer, total=0)

            items = dict(request.data[0]).values()
            form_data = request.data[1]
            cart_total = 0
            for item in items:
                subtotal = int(item['qty'] * item['price'])
                cart_total += subtotal
                product_obj = Product.objects.get(id=item['id'])
                cart_product = CartProduct.objects.create(
                    cart=cart_obj, price = item['price'],
                    quantity = item['qty'], subtotal = subtotal
                )
                cart_product.product.add(product_obj)
            cart_obj.total += int(cart_total)
            cart_obj.save()

            Order.objects.create(
                cart = cart_obj, email= form_data['email'], mobile = form_data['mobile'],
                address = form_data['address'], total = cart_total, discount = 2,
            )
            
            old_carts = Cart.objects.filter(customer=customer, complete=False)
            if old_carts:
                for crt in old_carts:
                        old_order = Order.objects.get(cart=crt)
                        if old_order.payment == True:
                            crt.complete = True
                            crt.save()

            return Response({'error':False, 'message':"Congrats! Order has been placed successfully"})
        except Exception as e:
            print(e)
            return Response({'error':True, 'message':"Failed! Order placement unsuccessfull"})
        

class OldOrdersView(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classess = [IsAuthenticated,]

    def get(self, request):
        user = request.user
        orders = Order.objects.filter(cart__customer__prouser=user, payment=True, order_status='Order Completed')
        # print(orders)
        # for order in orders:
        #     print(order.email)
        serializer = OldOrderSerializer(orders, many=True)
        # return Response({'error': False, 'message':"Old orders fetched successfully."})
        return Response({'error': False, 'message':"Old orders fetched successfully.", 'data':serializer.data})