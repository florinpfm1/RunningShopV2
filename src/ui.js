// Class & methods to display products in pages
class UI {
	constructor() {
		this.productContainer = document.getElementById('products');
		this.randomProductsFromCategoriesContainer = document.getElementById('randomProductsFromCategories');
		this.productDetailsContainer = document.getElementById('productDetails');
		this.cartAllProductsContainer = document.getElementById('cartAllProducts');
		this.stockTableContainer = document.getElementById('stockTableBody');
	}

	showProducts(products) {
		let output = '';
		products.forEach((product) => {
			output += `
			<div id="productId${product.id}" class="col-sm-6 col-md-4 col-lg-3">
				<div class="card h-100 border-danger">
					<div class="card-header text-end bg-transparent border-danger text-uppercase">
						<a class="btn btn-outline-dark btn-sm px-4" href='products_category.html?category=${product.category}' role="button">${product.category}</a>
					</div>
					<a href='details.html?id=${product.id}'><img id="${product.id}" class="card-img-top mainImageFromProductCard" onmouseover="handleHoverOn()" onmouseout="handleHoverOff()" src="${product.picture}" data="${product.picture}" dataHover="${product.pictureBack}" alt="Card image"></a>
					<div class="card-body bg-transparent">
						<h5 class="card-title">${product.name}</h5>
						<p class="card-text">${product.price} $</p>
					</div>
					<div class="card-footer bg-transparent border-danger">
						<div class="d-grid gap-2 d-md-block">
							<a class="btn btn-grad btn-sm px-4" href='details.html?id=${product.id}' role="button">Details</a>
							<button id="btnAddToLS-${product.id}" class="btn btn-outline-success btn-sm applyToLS" type="button"><i class="fas fa-cart-plus"></i> Add to Cart</button>
						</div>
					</div>
				</div>
			</div>
			`;
			this.productContainer.innerHTML = output;
		});
	}

	randomProductsFromCategories(products) {
		let output = '';
		products.forEach((product) => {
			output += `
			<div class="col-sm-6 col-md-4 col-lg-3">
				<div class="card h-100 border-danger">
					<div class="card-header text-center bg-transparent border-danger text-uppercase">Category: ${product.category}</div>
					<a href='products_category.html?category=${product.category}'><img class="card-img-top" src="${product.picture}" alt="Card image"></a>
					<div class="card-footer bg-transparent border-danger">
						<div class="d-grid gap-2 d-md-block text-center">
							<a class="btn btn-grad btn-sm px-2" href='products_category.html?category=${product.category}' role="button">See Category</a>
						</div>
					</div>
				</div>
			</div>
			`;
			this.randomProductsFromCategoriesContainer.innerHTML = output;
		});
	}

	showProductDetails(product) {
		let output = '';
		output = `
			<!--Main product picture + description-->
			<div id="productId${product.id}" class="col">
				<!--Name and Price hidden lg-->
				<div class="d-flex justify-content-between d-lg-none">
					<p class="fw-bold fst-italic">${product.name}</p>
					<p>Price: ${product.price}$</p>
				</div>
				<!--Picture high res-->
				<div class="d-flex flex-column justify-content-center align-items-center">
					<div class="container-fluid imgDetailsBackground starsHeartParent">
						<div class="imgDetails mx-auto  ">
							<img class="img-fluid rounded" src="${product.pictureDetails}" alt="product picture">
						</div>
						<!--Stars rating and Heart-->
						<div class="d-flex starsPosition">
							<i class="fa fa-star fa-sm ratingColor"></i>
							<i class="fa fa-star fa-sm ratingColor"></i>
							<i class="fa fa-star fa-sm ratingColor"></i>
							<i class="fa fa-star fa-sm ratingColor"></i>
							<i class="fa fa-star fa-sm ratingColor"></i>
						</div>
						<div class="d-flex heartPosition">
							<i class="fa fa-heart fa-sm heartColor"></i>
						</div>
						<div class="d-flex flex-column align-content-end enlargePosition">
							<button id="enlargeBtn" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#fullScreenModal" type="button">ZOOM IN</button>
						</div>
						<!-- Full screen modal -->
						<div id="fullScreenModal" class="modal">
							<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen">
								<div class="modal-content">
									<div class="modal-header">
									
									</div>
									<div class="modal-body">
										<img class="img-fluid rounded" src="${product.pictureDetails}" alt="product picture">
									</div>
									<div class="modal-footer m-0 p-0">
										<button type="button" class="btn btn-outline-danger mx-auto" data-bs-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--Colors, Sizes, Stock and Add to Cart button hidden in lg-->
				<div class="d-flex flex-column justify-content-center align-items-start d-lg-none">
					<div class="my-3">
						<p class="mb-2">Colors:</p>
						<div class="d-flex flex-wrap">
							<div class="squareElem redColor"></div>
							<div class="squareElem blueColor"></div>
							<div class="squareElem greenColor"></div>
							<div class="squareElem orangeColor"></div>
							<div class="squareElem purpleColor"></div>
						</div>
					</div>
					<div class="mb-3">
						<p class="mb-2">Sizes clothes:</p>
						<div class="d-flex flex-wrap text-center">
							<p class="squareElem">S</p>
							<p class="squareElem">M</p>
							<p class="squareElem">L</p>
							<p class="squareElem">XL</p>
							<p class="squareElem">XXL</p>
							<p class="squareElem">XXXL</p>
						</div>
					</div>
					<div class="mb-3">
						<p class="mb-2">Sizes shoes:</p>
						<div class="d-flex flex-wrap text-center">
							<p class="squareElem">36</p>
							<p class="squareElem">37</p>
							<p class="squareElem">38</p>
							<p class="squareElem">39</p>
							<p class="squareElem">40</p>
							<p class="squareElem">41</p>
							<p class="squareElem">42</p>
							<p class="squareElem">43</p>
							<p class="squareElem">44</p>
							<p class="squareElem">45</p>
							<p class="squareElem">46</p>
						</div>
					</div>
					<p>Availability: ${product.stock}</p>
					<div class="d-grid col-12 mx-auto">
						<button id="btn1AddToLS-${product.id}" class="btn btn-outline-success applyToLS"><i class="fas fa-cart-plus"></i> ADD TO CART</button>
					</div>
				</div>
				<!--Short and Long Description with Picture Extra-->
				<div class="container descriptionWidth my-5">
					<div class="row g-0">
						<div class="col-lg-6 col-md-12">
							<div class="d-flex flex-column mx-4 pb-2" >
								<p class="pt-1 pb-0 mb-1 fw-bold fst-italic textName">${product.name}</p>
								<p class="pb-0 mb-1 fst-italic textShortDescription">${product.descriptionShort}</p>
								<p class="pb-0 mb-0 textLongDescription">${product.descriptionLong}</p>
							</div>
						</div>
						<!--Picture Extra-->
						<div class="col-lg-6 col-md-12">
							<img class="img-fluid mx-auto d-block" src="${product.pictureExtra}" alt="image extra">
						</div>
					</div>
				</div>
			</div>
			<!--Sidebar of product-->
			<div class="col-3 d-none d-lg-block">
				<!--Name, price, colors, sizes, stock, Add to Cart button-->
				<div class="d-flex flex-column justify-content-center align-items-start my-4 ">
					<p class="fw-bold fst-italic">${product.name}</p>
					<p>Price: ${product.price}$</p>
					<div class="mb-3">
						<p class="mb-2">Colors:</p>
						<div class="d-flex flex-wrap">
							<div class="squareElem redColor"></div>
							<div class="squareElem blueColor"></div>
							<div class="squareElem greenColor"></div>
							<div class="squareElem orangeColor"></div>
							<div class="squareElem purpleColor"></div>
						</div>
					</div>
					<div class="mb-3">
						<p class="mb-2">Sizes clothes:</p>
						<div class="d-flex flex-wrap text-center">
							<p class="squareElem">S</p>
							<p class="squareElem">M</p>
							<p class="squareElem">L</p>
							<p class="squareElem">XL</p>
							<p class="squareElem">XXL</p>
							<p class="squareElem">XXXL</p>
						</div>
					</div>
					<div class="mb-3">
						<p class="mb-2">Sizes shoes:</p>
						<div class="d-flex flex-wrap text-center">
							<p class="squareElem">36</p>
							<p class="squareElem">37</p>
							<p class="squareElem">38</p>
							<p class="squareElem">39</p>
							<p class="squareElem">40</p>
							<p class="squareElem">41</p>
							<p class="squareElem">42</p>
							<p class="squareElem">43</p>
							<p class="squareElem">44</p>
							<p class="squareElem">45</p>
							<p class="squareElem">46</p>
						</div>
					</div>
					<p>Availability: ${product.stock}</p>
					<div class="d-grid col-12 mx-auto">
						<button id="btn2AddToLS-${product.id}" class="btn btn-outline-success applyToLS"><i class="fas fa-cart-plus"></i> ADD TO CART</button>
					</div>
				</div>
			</div>
			`;
		this.productDetailsContainer.innerHTML = output;
	}

	showCart(products) {
		let output ='';
		products.forEach((product) => {
			output += `
			<div id="productFromCartId-${product.id}" class="card mb-2">
				<div class="row g-0">
					<!--card picture-->
					<div class="col-md-3">
						<img src="${product.picture}" class="img-fluid rounded-start" alt="...">
					</div>
					<!--card body-->
					<div class="col-md-9">
						<div class="card-body m-1 p-1">
							<!--product name-->
							<div class="d-flex justify-content-between align-items-center pb-1">
								<p class="card-title cardName m-0">${product.name}</p>
								<i class="fas fa-heart fa-sm heartColor mx-1"></i>
							</div>
							<div class="d-flex justify-content-between">
								<!--product characteristics-->
								<div class="d-flex flex-column justify-content-between align-items-start">
									<p class="card-text cardText m-0">COLOR: blue</p>
									<p class="card-text cardText m-0">SIZE: L</p>
									<p class="card-text cardText m-0">AVAILABILITY: ${product.stock}</p>
								</div>
								<div class="d-flex flex-column align-items-end">
									<button id="deleteBtnForProductInCart-${product.id}" class="btn btn-outline-danger cardText mx-1 py-1 applyDeleteFromCart"><i class="fas fa-trash-alt m"></i> DELETE</button>
									<div class="d-flex justify-content-end qtyIncDecHeight my-1 mx-1 text-center">
										<a id="productToDecId-${product.id}" class="signWidth decProductFromLS" href="#" role="button"><i class="fas fa-minus fa-sm" style="color:blue"></i></a>
										<p id="quantityPerProductId-${product.id}" class="border-0 text-center cardQty">${product.initialQtyLS}</p>
										<a id="productToIncId-${product.id}" class="signWidth incProductFromLS" href="#" role="button"><i class="fas fa-plus fa-sm" style="color:blue"></i></a>
									</div>
									<p id="elemTotalPrice-${product.id}" class="card-text cardPrice fw-bold mx-1">${product.initialPriceLS}$</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<input id="quantityForIdXX1" class="border-0 text-center cardQty" type="text" name=""  value="0" size="2" style="display: none">
			`;
			this.cartAllProductsContainer.innerHTML = output;
		})
	}

	showStockTable(products) {
		let output = '';
		products.forEach((product) => {
			output += `
			<tr id="stockTableProductId${product.id}" class="border-top border">
				<td class="border-end border">${product.id}</td>
				<td class="border-end border">
					<div class="adminImage">
						<img class="img-fluid" src="${product.picture}" alt="product image">
					</div>
				</td>
				<td class="border-end border">${product.name}</td>
				<td class="border-end border">${product.price} $</td>
				<td class="border-end border">${product.stock}</td>
				<td class="text-center">
					<div class="d-grid gap-2 d-md-block">
							<button id="modifyBtnForProductInServer-${product.id}" class="btn btn-outline-warning btn-sm m-1 applyModifyToServer" type="button">Modify</button>
							<button id="deleteBtnForProductInServer-${product.id}" class="btn btn-outline-danger btn-sm m-1 applyDeleteToServer" type="button">Delete</button>
					</div>
				</td>
			</tr>
			`;
			this.stockTableContainer.innerHTML = output;
		});
	}
}

export const ui = new UI();

