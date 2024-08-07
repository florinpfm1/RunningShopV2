// --------------------------------- for Admin page------------------------------------
import { http } from './http.js';
import { ui } from './ui.js';
import { displayMessage } from './script-shared.js';

const productsURL = 'https://6136452c8700c50017ef5509.mockapi.io/products';
const openAddProductWindow = document.getElementById('openAddProductWindow');
const inputForm = document.getElementById('inputForm');
const stockTable = document.getElementById('stockTable');
const productForm = document.getElementById('productForm');
const submitFormButton = document.getElementById('submitFormButton');
const editFormButton = document.getElementById('editFormButton');
const closeFormButton = document.getElementById('closeFormButton');
const resetFormButton = document.getElementById('resetFormButton');
const messageOnProductAdd = "Product was successfully added";
const messageOnProductEdit = "Product was successfully edited";

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

// Add or Modify product form
openAddProductWindow.addEventListener('click', () => {
    inputForm.style.display = 'block';
    stockTable.style.display = 'none';
    editFormButton.classList.add('disabled');
    submitFormButton.classList.remove('disabled'); 

})
closeFormButton.addEventListener('click', () => {
    inputForm.style.display = 'none';
    stockTable.style.display = 'block';
    productForm.reset();
    productForm.classList.remove('was-validated');
})

// Add new product : POST a new product
submitFormButton.addEventListener('click', () => {
    addNewProduct('add');
});

editFormButton.addEventListener('click', () => {
    addNewProduct('edit');
});

resetFormButton.addEventListener('click', () => {
    productForm.reset();
    productForm.classList.remove('was-validated');
})

function addNewProduct(action) {
    var forms = document.querySelectorAll(".needs-validation");
    for (const form of forms) {
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }
    }

    // Getting the input values from form fields
    let idValue = document.getElementById('id01').value;
    let titleValue = document.getElementById('name02').value;
    let pictureValue = document.getElementById('picture03').value;
    let pictureDetailsValue = document.getElementById('pictureDetails04').value;
    let pictureExtraValue = document.getElementById('pictureExtra05').value;
    let pictureBackValue = document.getElementById('pictureBack06').value;
    let priceValue = document.getElementById('price07').value;
    let descriptionShortValue = document.getElementById('descriptionShort08').value;
    let descriptionLongValue = document.getElementById('descriptionLong09').value;
    let categoryInput = document.getElementById('category10');
    let categoryValue = categoryInput.options[categoryInput.selectedIndex].text;
    let stockValue = document.getElementById('stock11').value;

    let productFromInputFields = {
        name: titleValue,
        picture: pictureValue,
        pictureDetails: pictureDetailsValue,
        pictureExtra: pictureExtraValue,
        pictureBack: pictureBackValue,
        price: priceValue,
        descriptionShort: descriptionShortValue,
        descriptionLong: descriptionLongValue,
        category: categoryValue,
        stock: stockValue,
        id: idValue
    };

    if(action == 'add') {
        http.post((productsURL), productFromInputFields)
            .then((data) => {
                productForm.reset();
                productForm.classList.remove('was-validated');
                displayMessage(messageOnProductAdd);
                getProductsForAdmin();
            });
    } else if (action == 'edit') {
        http.put((`${productsURL}/${productFromInputFields.id}`), productFromInputFields)
            .then((data) => {
                productForm.reset();
                productForm.classList.remove('was-validated');
                displayMessage(messageOnProductEdit);
                getProductsForAdmin();
            });
    }
}

// Create Stock Table from API
document.addEventListener('DOMContentLoaded', getProductsForAdmin);
function getProductsForAdmin() {
	http.get(productsURL).then((products) => ui.showStockTable(products));
}

// Modify Table Stock : DELETE, PUT an existing product
const stockTableBody = document.getElementById('stockTableBody');
stockTableBody.addEventListener('click', (e) => {
    deleteProductFromServer(e);
    modifyProductFromServer(e);
})

function deleteProductFromServer(e) {
	if (e.target.classList.contains('applyDeleteToServer')) {
		const id = e.target.getAttribute('id');
        let productId = id.split("-");

		http.delete(`${productsURL}/${productId[1]}`)
			.then(() => getProductsForAdmin())
			.catch('Error on delete');
	}
}

function modifyProductFromServer(e) {
	if (e.target.classList.contains('applyModifyToServer')) {
        // Hide table + show AddProduct window
        inputForm.style.display = 'block';
        stockTable.style.display = 'none';
        editFormButton.classList.remove('disabled');
        submitFormButton.classList.add('disabled'); 

		const id = e.target.getAttribute('id');
        let productId = id.split("-");

        http.get((`${productsURL}/${productId[1]}`))
            .then((item) => {
                // Settings the input fields from the server
                document.getElementById('id01').value = item.id;
                document.getElementById('name02').value = item.name;
                document.getElementById('picture03').value = item.picture;
                document.getElementById('pictureDetails04').value = item.pictureDetails;
                document.getElementById('pictureExtra05').value = item.pictureExtra;
                document.getElementById('pictureBack06').value = item.pictureBack;
                document.getElementById('price07').value = item.price;
                document.getElementById('descriptionShort08').value = item.descriptionShort;
                document.getElementById('descriptionLong09').value = item.descriptionLong;
                var $select = $('#category10');
                $select.children().filter(function(){
                    return this.text == item.category;
                    }).prop('selected', true);
                document.getElementById('stock11').value = item.stock;
            })
    }
}

// Photo preview
jQuery(document).ready(function($) {
    $('#picture03').bind('input', function() {
        $('#imageHolder03').attr('src', $(this).val()); 
    });
});
jQuery(document).ready(function($) {
    $('#pictureDetails04').bind('input', function() {
        $('#imageHolder04').attr('src', $(this).val()); 
    });
});
jQuery(document).ready(function($) {
    $('#pictureExtra05').bind('input', function() {
        $('#imageHolder05').attr('src', $(this).val()); 
    });
});
jQuery(document).ready(function($) {
    $('#pictureBack06').bind('input', function() {
        $('#imageHolder06').attr('src', $(this).val()); 
    });
});

// Newsletter
let sendNewsletter = document.getElementById('sendNewsletter');
let inputEmailNewsletter = document.getElementById('inputEmailNewsletter')
sendNewsletter.addEventListener('click', () => {
	inputEmailNewsletter.value = '';
});