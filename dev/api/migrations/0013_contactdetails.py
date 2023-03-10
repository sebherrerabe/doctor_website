# Generated by Django 4.1.5 on 2023-01-13 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0012_category_news_categories"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContactDetails",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=255)),
                ("address", models.TextField()),
                ("embedded_map", models.TextField(blank=True, null=True)),
            ],
        ),
    ]
