// --------------------------------- for Discounts page------------------------------------
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