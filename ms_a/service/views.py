from django.shortcuts import render

from django.http import HttpResponse


def service(request):
    return HttpResponse("This is service app.")
