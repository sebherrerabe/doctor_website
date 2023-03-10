# Generated by Django 4.1.5 on 2023-01-25 13:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_image_external_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactdetails',
            name='image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contact_image', to='api.image'),
        ),
    ]
