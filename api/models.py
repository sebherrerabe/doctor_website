from django.db import models
from colorfield.fields import ColorField
from tinymce.models import HTMLField
from django.utils.text import slugify


class SiteSettings(models.Model):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    favicon = models.ImageField(upload_to="images/", blank=True, null=True)
    logo = models.ImageField(upload_to="images/", blank=True, null=True)
    background_image = models.ImageField(upload_to="images/", blank=True, null=True)
    main_image = models.ImageField(upload_to="images/", blank=True, null=True)
    brand_color = ColorField(default="#618A5F")
    primary_color = ColorField(default="#FFFFFF")
    secondary_color = ColorField(default="#D9D9D9")
    text_color = ColorField(default="#FF0000")

    def __str__(self):
        return self.name


class Page(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True)
    content = HTMLField(blank=True, null=True)
    icon = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    meta_keywords = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class News(models.Model):
    date_published = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=255, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = HTMLField(blank=True, null=True)
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title + "-" + str(self.date_published) + "-" + str(self.id))
        super(News, self).save(*args, **kwargs)


class ContactDetails(models.Model):
    name = models.CharField(max_length=255, default="Contact")
    email = models.EmailField()
    phone = models.CharField(max_length=255)
    address = models.TextField()
    embedded_map = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
