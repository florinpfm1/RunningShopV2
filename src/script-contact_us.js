// --------------------------------- for Contact Us page------------------------------------
import { displayMessage } from "./script-shared.js";

const messageOnMessageSubmit = "Message was successfully sent";
const sendMessageButton = document.getElementById('sendMessageButton');
const contactForm = document.getElementById('contactForm');

// Send message form
sendMessageButton.addEventListener('click', function(e){
    // Check validation for inputs of form
    var forms = document.querySelectorAll(".needs-validation");
    for (const form of forms) {
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }
    }
    contactForm.reset();
    contactForm.classList.remove('was-validated');
    // Display confirmation message
    displayMessage(messageOnMessageSubmit);
});

// Local Storage: get from Local Storage + display in navbar number of items in cart
let cartLS = [];
let productsInsideCart = document.getElementById('productsInsideCart');

window.onload = () => {
    let myExistingCart = localStorage.getItem('myCart');
    if(myExistingCart) {
        const myCartObj = JSON.parse(myExistingCart);
		myCartObj.forEach((item) => cartLS.push(item));
		productsInsideCart.innerText = cartLS.length;
    }
};

// Newsletter
let sendNewsletter = document.getElementById('sendNewsletter');
let inputEmailNewsletter = document.getElementById('inputEmailNewsletter')
sendNewsletter.addEventListener('click', () => {
	inputEmailNewsletter.value = '';
});
