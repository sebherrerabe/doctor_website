from django.urls import path
from .views import renderIndex, renderActualites

urlpatterns = [
    path("", renderIndex, name="index"),
    path("actualites", renderActualites, name="actualites"),
    path("actualites/<int:id>", renderActualites, name="actualites"),
]
