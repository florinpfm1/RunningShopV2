// ------------------------------ for Products Category page---------------------------
// Get param from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let productCategory = urlParams.get('category');

import { http } from './http.js';
import { ui } from './ui.js';
import { displayMessage } from './script-shared.js';

const productsCategoryURL = 'https://6136452c8700c50017ef5509.mockapi.io/products?category=' + productCategory;
const productsURL = 'https://6136452c8700c50017ef5509.mockapi.io/products';
const messageOnAddedToCart = "Product was added to Cart";

// Get product from API
document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
	http.get(productsCategoryURL).then((products) => ui.showProducts(products));
}

// Filter and Sorting
let sortByName = document.getElementById('sortByName');
let sortByPrice = document.getElementById('sortByPrice');
let resetSort = document.getElementById('resetSort');

sortByName.addEventListener('change', function() {
	mySorting(this.value, 'name');
})

sortByPrice.addEventListener('change', function() {
	mySorting(this.value, 'price');
})

resetSort.addEventListener('click', getProducts);

function mySorting(type, elem) {
	http.get(productsCategoryURL + '&sortBy=' + elem + '&order=' + type).then((products) => ui.showProducts(products));
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
