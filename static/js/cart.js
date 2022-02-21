updateButtons = document.getElementsByClassName('update-cart')

for (var i = 0; updateButtons.length > i; i++) {
	updateButtons[i].addEventListener('click', function(){
		action = this.dataset.action
		productId = this.dataset.product
		console.log('ProductId:', productId, 'Action:', action)

		console.log('USER:', user)
		if (user == 'AnonymousUser') {
			addCookieItem(productId, action)
		}else{
			updateUserOrder(productId, action)
		}
	})
}

async function updateUserOrder(productId, action){
	console.log('You are authenticated')

	var url = '/update_order/'

	var data = {
		'productId': productId,
		'action': action,
	}

	let response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify(data),
	});
	let content = await response.json();
	console.log('Data:', content)
	location.reload()
}

function addCookieItem(productId, action){
	console.log('User is not defined')
	if (action == 'add') {
		if (cart[productId] == undefined) {
			cart[productId] = {'quantity': 1}
		}else{
			cart[productId]['quantity'] += 1
		}
	}

	if (action == 'remove') {
		cart[productId]['quantity'] -= 1
		if (cart[productId]['quantity'] <= 0) {
			console.log('Item should be deleted')
			delete cart[productId];
		}
	}
	document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
	location.reload()
}