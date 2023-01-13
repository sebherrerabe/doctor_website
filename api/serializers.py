from rest_framework import serializers
from .models import SiteSettings, Page, News, Category


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ("title", "slug", "icon")


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = (
            "id",
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
        return NewsSerializer(obj.news_set.all(), many=True).data
