from django.shortcuts import render

def index(request):
    return render(request, "vitrine/index.html")

def politique(request):
    return render(request, 'politique.html')