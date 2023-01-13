from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import SiteSettings, Page, News, Category, ContactDetails
from .serializers import (
    SiteSettingsSerializer,
    PageListSerializer,
    PageDetailSerializer,
    NewsListSerializer,
    CategorySerializer,
    NewsDetailSerializer,
    ContactDetailsSerializer,
)
from rest_framework import generics
from .pagination import StandardResultsSetPagination
from datetime import datetime


class SiteSettingsView(APIView):
    def get(self, request):
        site_settings = SiteSettings.objects.first()
        if site_settings:
            serializer = SiteSettingsSerializer(site_settings)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Site settings not found."})


class PageListView(APIView):
    def get(self, request):
        pages = Page.objects.all().order_by("order")
        serializer = PageListSerializer(pages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PageDetailView(APIView):
    def get(self, request, slug):
        page = Page.objects.filter(slug=slug).first()
        if page:
            serializer = PageDetailSerializer(page)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Page not found."}, status=status.HTTP_404_NOT_FOUND)


class NewsListView(generics.ListAPIView):
    serializer_class = NewsListSerializer
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


class NewsDetailView(APIView):
    def get(self, request, slug):
        print(slug)
        news = News.objects.filter(is_active=True, slug=slug).first()
        if news:
            serializer = NewsDetailSerializer(news)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "News not found."}, status=status.HTTP_404_NOT_FOUND)


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
            news = News.objects.filter(date_published__month=datetime.strptime(date, "%B %Y").month).order_by(
                "-date_published"
            )
            list.append({"name": date, "news": NewsListSerializer(news, many=True).data})
        return Response(list)


class ContactDetailsView(APIView):
    def get(self, request):
        contact_details = ContactDetails.objects.first()
        if contact_details:
            serializer = ContactDetailsSerializer(contact_details)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Contact details not found."})


class ContactDetailsMessageView(APIView):
    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        phone = request.data.get("phone")
        message = request.data.get("message")
        print(name, email, phone, message)
        return Response({"message": "Message sent successfully."}, status=status.HTTP_200_OK)
