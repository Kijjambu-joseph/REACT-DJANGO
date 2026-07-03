
from django.urls import path
from .views import get_books, create_book, get_logins, create_login


urlpatterns = [
    path('books/', get_books, name='get_books'),
    path('books/create/', create_book, name='create_book'),
    path('logins/', get_logins, name='get_logins'),
    path('logins/create/', create_login, name='create_login'),
]