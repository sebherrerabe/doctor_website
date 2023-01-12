from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SiteSettings, Page, News, Category
from .serializers import SiteSettingsSerializer, PageSerializer, NewsSerializer, CategorySerializer
from rest_framework import generics
from .pagination import StandardResultsSetPagination
from datetime import datetime


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


class NewsListView(generics.ListAPIView):
    serializer_class = NewsSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = News.objects.filter(is_active=True).order_by("-date_published")
        if "highlights" in self.request.query_params:
            queryset = queryset[:6]
        return queryset

    def paginate_queryset(self, queryset):
        if "highlights" in self.request.query_params:
            return None
        return super().paginate_queryset(queryset)


class NewsByCategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class NewsByDateListView(APIView):
    def get(self, request):
        news = News.objects.filter(is_active=True)
        dates = news.values_list("date_published", flat=True).distinct()
        dates = set(date.strftime("%B %Y") for date in dates)
        list = []
        for date in dates:
            news = News.objects.filter(date_published__month=datetime.strptime(date, "%B %Y").month)
            list.append({"name": date, "news": NewsSerializer(news, many=True).data})
        return Response(list)
