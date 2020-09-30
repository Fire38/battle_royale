from django.shortcuts import render


# Create your views here.
def index(request):
    print('tut')
    return render(request, 'frontend/tutorial.html')
