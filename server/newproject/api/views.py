
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Login
from .serializer import BookSerializer, LoginSerializer


@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serialized_data = BookSerializer(books, many=True).data
    return Response(serialized_data)


@api_view(['POST'])
def create_book(request):
    data = request.data
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_logins(request):
    logins = Login.objects.all().order_by('-created_at')
    serialized_data = LoginSerializer(logins, many=True).data
    return Response(serialized_data)


@api_view(['POST'])
def create_login(request):
    data = request.data
    serializer = LoginSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)