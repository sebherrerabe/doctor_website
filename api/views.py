from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SiteSettings, Page, News
from .serializers import SiteSettingsSerializer, PageSerializer, NewsSerializer


class SiteSettingsView(APIView):
    def get(self, request):
        site_settings = SiteSettings.objects.first()
        if site_settings:
            serializer = SiteSettingsSerializer(site_settings)
            return Response(serializer.data)
        return Response({"message": "Site settings not found."})


class PageListView(APIView):
    def get(self, request):
        pages = Page.objects.all().order_by("order")
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)


class NewsListView(APIView):
    def get(self, request):
        highlights = request.GET.get("highlights")
        news = News.objects.filter(is_active=True).order_by("-date_published")
        if highlights:
            news = news[:6]
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)
