# Generated by Django 4.1.5 on 2023-01-09 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_page_slug"),
    ]

    operations = [
        migrations.AddField(
            model_name="page",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="images/"),
        ),
    ]
