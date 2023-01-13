from rest_framework import serializers
from .models import SiteSettings, Page, News, Category, ContactDetails


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class PageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ("title", "slug", "icon")


class PageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = "__all__"


class NewsDetailSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = "__all__"

    def get_categories(self, obj):
        return obj.categories.values_list("name", flat=True)


class NewsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = (
            "slug",
            "date_published",
            "description",
            "title",
            "image",
        )


class CategorySerializer(serializers.ModelSerializer):
    news = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = "__all__"

    def get_news(self, obj):
        return NewsListSerializer(obj.news_set.all(), many=True).data


class ContactDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactDetails
        fields = "__all__"
