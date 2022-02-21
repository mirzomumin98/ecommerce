from django.shortcuts import redirect

def check_user_authentication(view_func):
	'''Check user is authenticated or not'''
	def wrapper_func(request, *args, **kwargs):
		if request.user.is_authenticated:
			return redirect('store:store')
		else:
			return view_func(request, *args, **kwargs)
	return wrapper_func