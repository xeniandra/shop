var cart = {};

function loadCart(){
    //проверяю есть ли в localStorage запись cart
    if(localStorage.getItem('cart')){
        //если есть - расшифровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
		showCart(); 
    }
    else{
    	$('.main-cart').html('Корзина пуста!');
    }
}

function showCart(){
	//вывод корзины
        if (!isEmpty(cart)){
        	$('.main-cart').html('Корзина пуста!');
		}
		else{
	$.getJSON('goods.json', function (data) {
		var goods = data;
		var out = "";
		for (var id in cart) {
			out += `   <button data-id="${id}" class="del-goods">x</button>   `;
			out += ``;
			out += `   <img src="images\\${goods[id].img}">    `;
			out += ` ${goods[id].name  } `;
			out += `   <button data-id="${id}" class="minus-goods">-</button>  `;
			out += ` ${cart[id]}  `;
			out += `   <button data-id="${id}" class="plus-goods">+</button>  `;
			out += parseFloat(cart[id]*goods[id].cost).toFixed(2);
			out += ` <br>`;
		}
		$('.main-cart').html(out);
		$('.del-goods').on('click', delGoods);
		$('.plus-goods').on('click', plusGoods);
		$('.minus-goods').on('click', minusGoods);
	});
}
}

function delGoods(){
	//удаляем товар из корзины
	var id = $(this).attr('data-id');
	delete cart[id];
	saveCart();
	showCart();
}

function plusGoods(){
	//добавляет товар в корзине
	var id = $(this).attr('data-id');
	cart[id]++;
	saveCart();
	showCart();
}

function minusGoods(){
	//уменьшает кол-во товара в корзине
	var id = $(this).attr('data-id');
	if(cart[id] == 1){
		delete cart[id];
	}
	else{
		cart[id]--;
	}
	
	saveCart();
	showCart();
}

function saveCart(){
    //сохранение корзины в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));//коризну в строку
}

function isEmpty(object){
	//проверка корзины на пустоту
	for(var key in object)
	if (object.hasOwnProperty(key)) return true;
	return false;
}

function sendEmail(){
	var ename = $('#ename').val();
	var email = $('#email').val();
	var ephone = $('#ephone').val();
	if(ename!='' && email!='' && ephone!=''){
		if(isEmpty(cart)){
			$.post(
				"core/mail.php",
				{
					"ename" : ename,
					"email" : email,
					"ephone" : ephone,
					"cart" : cart
				},
				function(data){
					if(data == 1){
						alert('Заказ отправлен');
					}
					else{
						alert('Повторите заказ');
					}
				}
			);
		}
		else{
			alert('Корзина пуста');
		}
	}
	else{
		alert('Заполните поля');
	}
}

$(document).ready(function(){
	loadCart();
	$('.send-email').on('click', sendEmail);//отправить письмо с заказом
});