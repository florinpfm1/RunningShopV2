// --------------------------------- for Index page------------------------------------
import { http } from './http.js';
import { ui } from './ui.js';

const productsURL = 'https://6136452c8700c50017ef5509.mockapi.io/products';

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

// Get products from API
document.addEventListener('DOMContentLoaded', selectRandomProductsFromCategories);

function selectRandomProductsFromCategories() {
	http.get(productsURL)
	.then((products) => {
		let allProductsCategories = [];
		let singlets = products.filter(e => (e.category === 'singlets')); 
		let shorts = products.filter(e => (e.category === 'shorts'));
		let jackets = products.filter(e => (e.category === 'jackets'));
		let leggings = products.filter(e => (e.category === 'leggings'));
		let shoes = products.filter(e => (e.category === 'shoes'));
		let accessories = products.filter(e => (e.category === 'accessories'));
		let sportsBras = products.filter(e => (e.category === 'sports bras'));
		let skirts = products.filter(e => (e.category === 'skirts'));
		allProductsCategories.push(singlets[getRandomIntInclusive(0, singlets.length-1)]);
		allProductsCategories.push(shorts[getRandomIntInclusive(0, shorts.length-1)]);
		allProductsCategories.push(jackets[getRandomIntInclusive(0, jackets.length-1)]);
		allProductsCategories.push(leggings[getRandomIntInclusive(0, leggings.length-1)]);
		allProductsCategories.push(shoes[getRandomIntInclusive(0, shoes.length-1)]);
		allProductsCategories.push(accessories[getRandomIntInclusive(0, accessories.length-1)]);
		allProductsCategories.push(sportsBras[getRandomIntInclusive(0, sportsBras.length-1)]);
		allProductsCategories.push(skirts[getRandomIntInclusive(0, skirts.length-1)]);
		return allProductsCategories;
	})
	.then((products) => ui.randomProductsFromCategories(products));
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Newsletter
let sendNewsletter = document.getElementById('sendNewsletter');
let inputEmailNewsletter = document.getElementById('inputEmailNewsletter')
sendNewsletter.addEventListener('click', () => {
	inputEmailNewsletter.value = '';
});