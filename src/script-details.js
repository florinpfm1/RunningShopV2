// --------------------------------- for Details page------------------------------------
// Get params from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idOfProduct = urlParams.get('id');
let nameOfProduct = '';

import { http } from './http.js';
import { ui } from './ui.js';
import { displayMessage } from './script-shared.js';

const oneProductURL = 'https://6136452c8700c50017ef5509.mockapi.io/products/' + idOfProduct;
const messageOnAddedToCart = "Product was added to Cart";

//Get products from API
document.addEventListener('DOMContentLoaded', getOneProduct);

function getOneProduct() {
	http.get(oneProductURL)
        .then((product) => {
            nameOfProduct = product.name;
            ui.showProductDetails(product)
        });
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
let productDetails = document.getElementById('productDetails');
productDetails.addEventListener('click', addProductToLocalStorage)

function addProductToLocalStorage(e) {
	if (e.target.classList.contains('applyToLS')) {
        let itemToAddInCart = {
            id: idOfProduct,
            name: nameOfProduct,
        };
        cartLS.push(itemToAddInCart);
		localStorage.setItem('myCart', JSON.stringify(cartLS));
		productsInsideCart.innerText = cartLS.length;
        displayMessage(messageOnAddedToCart);
	}
}

// Newsletter
let sendNewsletter = document.getElementById('sendNewsletter');
let inputEmailNewsletter = document.getElementById('inputEmailNewsletter')
sendNewsletter.addEventListener('click', () => {
	inputEmailNewsletter.value = '';
});
