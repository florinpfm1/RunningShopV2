// --------------------------------- for Cart page------------------------------------
import { http } from './http.js';
import { ui } from './ui.js';

const productsURL = 'https://6136452c8700c50017ef5509.mockapi.io/products';

// Local Storage
let cartLS = [];
let productsInsideCart = document.getElementById('productsInsideCart');
let itemsInsideOrder = document.getElementById('itemsInsideOrder');

window.onload = async () => {
    let myExistingCart = localStorage.getItem('myCart');
    if(myExistingCart) {
        const myCartObjects = JSON.parse(myExistingCart);
        for (const myCartObj of myCartObjects) {
            let objId = myCartObj.id;
            // Getting async from server every product in cart
            const item = await http.get((`${productsURL}/${objId}`));
            let itemForMyCartToDisplay = {
                id: item.id,
                name: item.name,
                picture: item.picture,
                price: item.price,
                stock: item.stock
            };
            // Creating cart to be displayed
            cartLS.push(itemForMyCartToDisplay);
            productsInsideCart.innerText = cartLS.length;
            itemsInsideOrder.innerText = cartLS.length;
        }

        // Calculating initial quantity per product
        let uniqueIdKeys = [...new Set(cartLS.map((el) => el.id))];
        let cartToBeDisplayed = [];
        for(let k=0; k<uniqueIdKeys.length; k++) {
            for (let m=0; m<cartLS.length; m++) {
                if(uniqueIdKeys[k] == cartLS[m].id) {
                    cartToBeDisplayed.push(cartLS[m]);
                    break;
                }
            }
        }
        
        for(let n=0; n<uniqueIdKeys.length; n++) {
            let numOfUniqueElem = 0;
            for (let q=0; q<cartLS.length; q++) {
                if(uniqueIdKeys[n] == cartLS[q].id) {
                    numOfUniqueElem++;
                }
            }
            cartToBeDisplayed[n].initialQtyLS = String(numOfUniqueElem); 
        }

        // Calculating initial price per product
        for(let v=0; v<cartToBeDisplayed.length; v++) {
            let totalPricePerElem = 0;
            totalPricePerElem = Number(cartToBeDisplayed[v].initialQtyLS) * Number(cartToBeDisplayed[v].price);
            cartToBeDisplayed[v].initialPriceLS = String(totalPricePerElem);
        }

        // Delivery cost
        let costDelivery = 0;
        if(cartLS.length > 0) {
            costDelivery = 10;
        }

        // Calculating initial total order
        let costItems = 0;
        let costOrder = 0;
        for(let x=0; x<cartToBeDisplayed.length; x++) {
            costItems += Number(cartToBeDisplayed[x].initialPriceLS);
        }

        costOrder = costItems + costDelivery;
        let totalItemsPrice = document.getElementById('totalItemsPrice');
        totalItemsPrice.innerText = String(costItems) + '$';
        let deliveryCost = document.getElementById('deliveryCost');
        deliveryCost.innerText = String(costDelivery) + '$';
        let totalOrderPrice = document.getElementById('totalOrderPrice');
        totalOrderPrice.innerText = String(costOrder) + '$';

        // Display initial cart
        ui.showCart(cartToBeDisplayed);
    }
};

// Cart actions + calculations
const cartAllProducts = document.getElementById('cartAllProducts');
cartAllProducts.addEventListener('click', (e) => {
    deleteProductFromLS(e);
    increaseProductFromLS(e);
    decreaseProductFromLS(e);
});

// Order calculations
function orderCalculations() {
    let costDelivery = 0;
    if(cartLS.length > 0) {
        costDelivery = 10;
    }
    let costItems = 0;
    let costOrder = 0;
    for(let x=0; x<cartLS.length; x++) {
        costItems += Number(cartLS[x].price);
    }
    costOrder = costItems + costDelivery;
    let totalItemsPrice = document.getElementById('totalItemsPrice');
    totalItemsPrice.innerText = String(costItems) + '$';
    let deliveryCost = document.getElementById('deliveryCost');
    deliveryCost.innerText = String(costDelivery) + '$';
    let totalOrderPrice = document.getElementById('totalOrderPrice');
    totalOrderPrice.innerText = String(costOrder) + '$';
}

function deleteProductFromLS(e) {
	if (e.target.classList.contains('applyDeleteFromCart')) {
		let id = e.target.getAttribute('id');
		let productId = id.split("-");
        if(cartLS) {
            for (let i=cartLS.length-1; i>=0; --i) {
                if(cartLS[i].id == productId[1]) {
                    cartLS.splice(i,1);
                }
            }

            localStorage.setItem('myCart', JSON.stringify(cartLS));
            productsInsideCart.innerText = cartLS.length;
            itemsInsideOrder.innerText = cartLS.length;
            location.reload();
        }
	}
}

function increaseProductFromLS(e) {
    let parent = e.target.parentElement;
	if (parent.classList.contains('incProductFromLS')) {
		let id = parent.getAttribute('id');
		let productId = id.split("-");
        
        if(cartLS) {
            for (let i=0; i<cartLS.length; i++) {
                if(cartLS[i].id == productId[1]) {
                    let elemToIncrease = cartLS[i];
                    cartLS.push(elemToIncrease);
                    localStorage.setItem('myCart', JSON.stringify(cartLS));
                    productsInsideCart.innerText = cartLS.length;
                    itemsInsideOrder.innerText = cartLS.length;
                    break;
                }
            }

            let counter = 0;
            for(let s=0; s<cartLS.length; s++) {
                if(cartLS[s].id == productId[1]) {
                    counter++;
                }
            }
            let qty = e.target.parentElement.parentElement.querySelector(':nth-child(2)');
            qty.innerText = String(counter);

            let priceOfOneElem = 0;
            for(let v=0; v<cartLS.length; v++) {
                if(cartLS[v].id == productId[1]) {
                    priceOfOneElem = cartLS[v].price;
                    break;
                }
            }
            let totalElemPrice = counter * Number(priceOfOneElem);
            let elemTotalPrice = document.getElementById(`elemTotalPrice-${productId[1]}`);
            elemTotalPrice.innerText = String(totalElemPrice);

            orderCalculations();
        }
	}
}

function decreaseProductFromLS(e) {
    let parent = e.target.parentElement;
	if (parent.classList.contains('decProductFromLS')) {
		let id = parent.getAttribute('id');
		let productId = id.split("-");
        if(cartLS) {
            let counter1 = 0;
            for(let i=0; i<cartLS.length; i++) {
                if(cartLS[i].id == productId[1]) {
                    counter1++;
                }
            };

            if( counter1 > 1) {
                for (let i=0; i<cartLS.length; i++) {
                    if(cartLS[i].id == productId[1]) {
                        // let elemToDecrease = cartLS[i];
                        cartLS.splice(i,1);
                        localStorage.setItem('myCart', JSON.stringify(cartLS));
                        productsInsideCart.innerText = cartLS.length;
                        itemsInsideOrder.innerText = cartLS.length;
                        break;
                    }
                }
            } else {
                console.log('we cannot decrease lower than 1 item per product');
            }

            let counter = 0;
            for(let s=0; s<cartLS.length; s++) {
                if(cartLS[s].id == productId[1]) {
                    counter++;
                }
            }
            let qty = e.target.parentElement.parentElement.querySelector(':nth-child(2)');
            qty.innerText = String(counter);

            let priceOfOneElem = 0;
            for(let v=0; v<cartLS.length; v++) {
                if(cartLS[v].id == productId[1]) {
                    priceOfOneElem = cartLS[v].price;
                    break;
                }
            }
            let totalElemPrice = counter * Number(priceOfOneElem);
            let elemTotalPrice = document.getElementById(`elemTotalPrice-${productId[1]}`);
            elemTotalPrice.innerText = String(totalElemPrice);

            orderCalculations();
        }
	}
}

// Apply discount code
let applyCode = document.getElementById('applyCode');
let code = document.getElementById('code');

applyCode.addEventListener('click', () => {
    code.value ='';
});

// Newsletter
let sendNewsletter = document.getElementById('sendNewsletter');
let inputEmailNewsletter = document.getElementById('inputEmailNewsletter')
sendNewsletter.addEventListener('click', () => {
	inputEmailNewsletter.value = '';
});
