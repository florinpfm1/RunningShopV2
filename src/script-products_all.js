// --------------------------------- for Products All page------------------------------------
import { http } from './http.js';
import { ui } from './ui.js';
import { displayMessage } from './script-shared.js';

const productsURL = 'https://6136452c8700c50017ef5509.mockapi.io/products';
const messageOnAddedToCart = "Product was added to Cart";

// Show products from API
document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
	http.get(productsURL).then((products) => ui.showProducts(products));
}

// Filter and Sorting
let filterByCategory = document.getElementById('filterByCategory');
let resetFilter = document.getElementById('resetFilter');

filterByCategory.addEventListener('change', function() {
	myFilter(this.value);
});

resetFilter.addEventListener('click', getProducts);

function myFilter(elem) {
	http.get(productsURL +'/?category=' + elem).then((products) => ui.showProducts(products));
}

// Local Storage: get from Local Storage + display in navbar number of items in cart
let cartLS = [];
let productsInsideCart = document.getElementById('productsInsideCart'); //for navbar


window.onload = () => {
    let myExistingCart = localStorage.getItem('myCart');
    if(myExistingCart) {
        const myCartObj = JSON.parse(myExistingCart);
		myCartObj.forEach((item) => cartLS.push(item));
		productsInsideCart.innerText = cartLS.length;
    }
};

// Local Storage: set to Local Storage + display in navbar number of items in cart
let products = document.getElementById('products');
products.addEventListener('click', addProductToLocalStorage);

function addProductToLocalStorage(e) {
	if (e.target.classList.contains('applyToLS')) {
		const id = e.target.getAttribute('id');
		let productId = id.split("-");

		http.get((`${productsURL}/${productId[1]}`))
			.then((item) => {
				let itemToAddInCart = {
					id: item.id,
					name: item.name,
				};
				cartLS.push(itemToAddInCart);
				localStorage.setItem('myCart', JSON.stringify(cartLS));
				productsInsideCart.innerText = cartLS.length;
				displayMessage(messageOnAddedToCart);
			})
	}
}

// Newsletter
let sendNewsletter = document.getElementById('sendNewsletter');
let inputEmailNewsletter = document.getElementById('inputEmailNewsletter')
sendNewsletter.addEventListener('click', () => {
	inputEmailNewsletter.value = '';
});
