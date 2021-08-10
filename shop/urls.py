from django.urls import path
from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
router.register('category', CategoryViewSet, basename='category')

urlpatterns=[
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
    path('products/', ProductView.as_view(), name='products'),
    path('products/<int:id>/', ProductView.as_view(), name='products'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile_update/', UpdateProfileImageView.as_view(), name='profile_update'),
    path('place_order/', PlaceOrderView.as_view(), name='place_order'),
    path('old_orders/', OldOrdersView.as_view(), name='old_orders'),

    # path('category/', CategoryViewSet.as_view({'get':'list'}), name='category'),
    # path('category/<int:pk>/', CategoryViewSet.as_view({'get':'retrieve'}), name='category_products'),
]


