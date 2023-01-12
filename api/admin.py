from django.contrib import admin

# Register your models here.

from .models import SiteSettings, Page, News


admin.site.register(SiteSettings)
admin.site.register(Page)
admin.site.register(News)