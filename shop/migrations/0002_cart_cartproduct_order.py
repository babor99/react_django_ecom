# Generated by Django 3.2.3 on 2021-05-20 13:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.PositiveIntegerField()),
                ('complete', models.BooleanField(default=False)),
                ('added_on', models.DateField(auto_now_add=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=50)),
                ('mobile', models.CharField(max_length=20)),
                ('address', models.CharField(max_length=250)),
                ('total', models.PositiveIntegerField()),
                ('discount', models.PositiveIntegerField()),
                ('payment', models.BooleanField(default=False)),
                ('order_status', models.CharField(choices=[('On The Way', 'On The Way'), ('Order Processing', 'Order Processing'), ('Order Received', 'Order Received'), ('Order Cancelled', 'Order Cancelled'), ('Order Completed', 'Order Completed')], default='Order Received', max_length=25)),
                ('added_on', models.DateField(auto_now_add=True)),
                ('cart', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='shop.cart')),
            ],
        ),
        migrations.CreateModel(
            name='CartProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.PositiveIntegerField()),
                ('quantity', models.PositiveIntegerField()),
                ('subtotal', models.PositiveIntegerField()),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.cart')),
                ('product', models.ManyToManyField(to='shop.Product')),
            ],
        ),
    ]
