# Generated by Django 4.1.5 on 2023-01-25 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_sitesettings_main_images_alter_image_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sitesettings',
            name='main_image',
        ),
    ]