from django.urls import path
from .views import SiteSettingsView, PageListView, NewsListView, NewsByCategoryListView, NewsByDateListView


urlpatterns = [
    path("site-settings/", SiteSettingsView.as_view(), name="site-settings"),
    path("pages/", PageListView.as_view(), name="pages"),
    path("news/", NewsListView.as_view(), name="news"),
    path("news/category/", NewsByCategoryListView.as_view(), name="news-by-category"),
    path("news/date/", NewsByDateListView.as_view(), name="news-by-date"),
]
