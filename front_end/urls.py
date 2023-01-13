from django.urls import path
from .views import renderIndex

urlpatterns = [
    path("", renderIndex, name="index"),
    path("error", renderIndex, name="error"),
    path("actualites", renderIndex, name="actualites"),
    path("actualites/<slug:slug>", renderIndex, name="actualite-detail"),
    path("contact", renderIndex, name="contact"),
    path("<slug:slug>", renderIndex, name="page"),
]
