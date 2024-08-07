// --------------------------------- for Search page------------------------------------
// Get param from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchItem = urlParams.get('search');

const messageOnSearchNotFound = "Search returned no result. Try again.";
const messageOnAddedToCart = "Product was added to Cart";

import { http } from './http.js';
import { ui } from './ui.js';
import { displayMessage } from './script-shared.js';

const productsURL = 'https://6136452c8700c50017ef5509.mockapi.io/products';

// Display search from other pages
document.addEventListener('DOMContentLoaded', getProductsFromSearch);

function getProductsFromSearch() {
	// Get products from search
	http.get(productsURL + "?search=" + searchItem)
	.then((products) => {
		if(products.length>0) {
			ui.showProducts(products);
		} else {
			displayMessage(messageOnSearchNotFound);
		}
	})
}

let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
let products = document.getElementById('products');

// Display search from search.html
searchButton.addEventListener('click', function(e) {
	e.preventDefault();
	getProductsFromSearchInput(searchInput.value);
})

function getProductsFromSearchInput (text) {
	if(text) {
		// Empty products container
		products.innerHTML="";
		
		http.get(productsURL + "?search=" + text)
			.then((products) => {
				if(products.length>0) {
					ui.showProducts(products);
				} else {
					displayMessage(messageOnSearchNotFound);
				}
			})
	}

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
