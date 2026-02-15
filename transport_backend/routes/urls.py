from django.urls import path
from .views import signup, login
from .views import book_route,search_routes


urlpatterns = [
    path("search/", search_routes),
    path('signup/', signup),
    path('login/', login),
    path("book/", book_route),
]

