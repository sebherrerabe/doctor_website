from django.db import models
from colorfield.fields import ColorField
from tinymce.models import HTMLField
from django.utils.text import slugify
from pathlib import Path
from PIL import Image as PILImage
import os


class SiteSettings(models.Model):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    favicon = models.ForeignKey("Image", on_delete=models.SET_NULL, blank=True, null=True, related_name="favicon")
    background_image = models.ForeignKey(
        "Image", on_delete=models.SET_NULL, blank=True, null=True, related_name="background_image"
    )
    main_image = models.ForeignKey("Image", on_delete=models.SET_NULL, blank=True, null=True, related_name="main_image")
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
    image = models.ForeignKey("Image", on_delete=models.SET_NULL, blank=True, null=True, related_name="page_image")
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
    image = models.ForeignKey("Image", on_delete=models.SET_NULL, blank=True, null=True, related_name="news_image")
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


class Image(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="images/")
    alt = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.convert_to_webp()

    def convert_to_webp(self):
        if self.image.name.endswith(".ico"):
            return
        file_path = Path(self.image.path).resolve()
        image = PILImage.open(file_path)
        webp_file_path = file_path.with_suffix(".webp")
        image.save(webp_file_path, "WebP")
        self.image = str(webp_file_path)
        os.remove(file_path)
        super().save()
