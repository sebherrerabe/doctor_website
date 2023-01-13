# Generated by Django 4.1.5 on 2023-01-13 17:01

from django.db import migrations, models

from django.utils.text import slugify


def add_slug(apps, schema_editor):
    News = apps.get_model("api", "News")
    for news in News.objects.all():
        news.slug = slugify(news.title + "-" + news.date_published.strftime("%Y-%m-%d"))
        news.save()


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0014_contactdetails_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="news",
            name="slug",
            field=models.SlugField(blank=True, max_length=255),
        ),
        migrations.RunPython(add_slug),
    ]
