var cart ={};//корзина объект


function init() {
    // файл goods.json
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
    //вывод на страницу
    console.log(data); //массив
    var out='';
    for (var key in data){
        // out +='<div class="cart">';
        // out +='<p class="name">'+data[key].name+'</p>';
        // out +='<img src="images/'+data[key].img+'" alt="">';
        // out +='<div class="cost">'+data[key].cost+'</div>';
        // out +='<button class="add-to-cart">Купить</button>';
        // out +='</div>';
        //---------------------
        out +='<div class="cart">';
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="images/${data[key].img}" alt="">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart); //при нажатии на кнопку срабатывает функция
}

function addToCart(){
    //добавляет товар в корзину
    var id = $(this).attr('data-id');
    // console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1; //если в корзине нет товара, то делаем равным 1
    }
    else{
        cart[id]++; //если такой товар есть, увеличиваю на 1
    }
    showMiniCart();
}

function showMiniCart(){
    //показываю мини-корзину
    var out="";
    for (var key in cart) {
        out += key +' ----- '+ cart[key]+'<br>';
    }
    $('.mini-cart').html(out);
}

$(document).ready(function () {
    init();
});