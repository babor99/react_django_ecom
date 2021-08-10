from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model
from django.utils import tree

# Create your models here.

class Profile(models.Model):
    prouser = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile/', blank=True, null=True)

    def __str__(self):
        return self.prouser.username


class Category(models.Model):
    title = models.CharField(max_length=200)
    added_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=300)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    image = models.ImageField(upload_to='products/')
    market_price = models.PositiveIntegerField()
    sell_price = models.PositiveIntegerField()
    description = models.TextField()
    added_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


class Cart(models.Model):
    customer = models.ForeignKey(Profile, on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complete = models.BooleanField(default=False)
    added_on = models.DateField(auto_now_add=True)

    # def __str__(self) -> str:
    #     return f"Cart_id=={self.id}==Complete=={self.complete}"

class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f"Cart=={self.cart.id}==CartProduct=={self.id}==Quantity=={self.quantity}"


ORDER_STATUS = {
    ('Order Received', 'Order Received'),
    ('Order Processing', 'Order Processing'),
    ('On The Way', 'On The Way'),
    ('Order Completed', 'Order Completed'),
    ('Order Cancelled', 'Order Cancelled'),
}
class Order(models.Model):
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    email = models.CharField(max_length=50)
    mobile = models.CharField(max_length=20)
    address = models.CharField(max_length=250)
    total = models.PositiveIntegerField()
    discount = models.PositiveIntegerField()
    payment = models.BooleanField(default=False)
    order_status = models.CharField(max_length=25, choices=ORDER_STATUS, default='Order Received')
    added_on = models.DateField(auto_now_add=True)