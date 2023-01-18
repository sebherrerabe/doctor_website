from django.contrib import admin

# Register your models here.

from .models import SiteSettings, Page, News, Category, ContactDetails, Image, Icon


admin.site.register(SiteSettings)
admin.site.register(Page)
admin.site.register(News)
admin.site.register(Category)
admin.site.register(ContactDetails)
admin.site.register(Image)
admin.site.register(Icon)
