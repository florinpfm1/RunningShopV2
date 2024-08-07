// --------------------------------- for All pages------------------------------------
// Navbar: set the 'active' class on current page
var btns = document.querySelectorAll('.nav-link');

for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
};

// Search: initiated from all pages
let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function(e) {
	e.preventDefault();
	openSearchResults(searchInput.value);
});

function openSearchResults (text) {
	if(text) {
		location.href = `search.html?search=${text}`;
	}
};

// Displayed message for user
export function displayMessage(text) {
    let messageDiv = document.getElementById('messageDiv');
    let containerMessage = document.createElement('div');
    containerMessage.classList.add('containerMessageStyle');
    let message = document.createElement('p');
    message.classList.add('messageStyle');
    message.innerText = text;
    containerMessage.appendChild(message);
    messageDiv.appendChild(containerMessage);
    setTimeout(() => messageDiv.removeChild(containerMessage), 3000);
};


// Definition of Bootstrap Validation function
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();
            }, false)
        })
})();
