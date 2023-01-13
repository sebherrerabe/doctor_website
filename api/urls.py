from django.urls import path
from .views import (
    SiteSettingsView,
    PageListView,
    PageDetailView,
    NewsListView,
    NewsByCategoryListView,
    NewsByDateListView,
    NewsDetailView,
    ContactDetailsView,
    ContactDetailsMessageView,
)


urlpatterns = [
    path("site-settings/", SiteSettingsView.as_view(), name="site-settings"),
    path("pages/", PageListView.as_view(), name="pages"),
    path("pages/<slug:slug>/", PageDetailView.as_view(), name="page-detail"),
    path("news/", NewsListView.as_view(), name="news"),
    path("news/category/", NewsByCategoryListView.as_view(), name="news-by-category"),
    path("news/date/", NewsByDateListView.as_view(), name="news-by-date"),
    path("news/<slug:slug>/", NewsDetailView.as_view(), name="news-detail"),
    path("contact-details/", ContactDetailsView.as_view(), name="contact-details"),
    path("contact-details/message/", ContactDetailsMessageView.as_view(), name="contact-details-message"),
]
