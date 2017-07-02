app.factory("cartService",['storageService','ngDialog',function(storageService,ngDialog){
	var cartService = {};
	var cartProducts = [];
	cartService.totalDetails = {"total":0,"count":0,"isCheckOut":false};
	
	cartService.initialize = function(){
		cartProducts=storageService.fetchCart();
		if(cartProducts == undefined){
		cartProducts=[];
		}
		updateTotal();
		cartService.totalDetails.count=cartProducts.length;	
	}
	var addProd = function(product){
		var tempProduct = {
			"productCode":product.productCode,
			"productName":product.productName,
			"image":product.image,
			"qty":1,
			"productPrice":product.productPrice,
			"total":product.productPrice,
			"selected":"false"
		}
		cartProducts.push(tempProduct);
		storageService.saveCart(cartProducts);
	}
	cartService.getTotalItemSelected = function(){
		return this.totalDetails;
	}
	cartService.changeSelected = function(product){
		updateTotal();
	}
	cartService.changeQuantity = function(product){
		if(isNaN(Number(product.qty))||product.qty<1){
			product.qty=1;
		}
		if(product.qty>100){
			product.qty=100;
		}
		product.total = product.productPrice*product.qty;
		updateTotal();
	}
	var updateTotal = function(){
		var tempTotal = 0;
		for(var i=0;i<cartProducts.length;i++){
			var singleProduct = cartProducts[i];
			if(singleProduct.selected == true){
				tempTotal+=parseFloat(singleProduct.total);
			}
		}
		cartService.totalDetails.total = tempTotal;
		storageService.saveCart(cartProducts);
	}
	cartService.checkOut = function(){
		for(var i=0;i<cartProducts.length;i++){
			var singleProduct = cartProducts[i];
			if(singleProduct.selected == true){
				cartProducts.splice(i,1);
				i--;
			}
		}
		this.totalDetails.count=cartProducts.length;
		this.totalDetails.total = 0;
		this.totalDetails.isCheckOut=true;
		storageService.saveCart(cartProducts);
	}
	cartService.addToCart = function(product){
		for(var i=0;i<cartProducts.length;i++){
			var singleProduct = cartProducts[i];
			if(singleProduct.productCode == product.productCode){
				ngDialog.open({"template":"<div class='center-align'><h2 >"+product.productName+"</h2><figure><img src='"+product.image+"'></figure><span> has been already in the cart</span></div>","plain":true,"className": 'ngdialog-theme-default'});
				return false;
			}
		}
		addProd(product);
		this.totalDetails.count=cartProducts.length;
		ngDialog.open({"template":"<div class='center-align'><h2 >"+product.productName+"</h2><figure><img src='"+product.image+"'></figure><span> has been added to cart</span></div>","plain":true,"className": 'ngdialog-theme-default'});
		return true;
	}
	cartService.removeFromCart = function(product){
		for(var i=0;i<cartProducts.length;i++){
			var singleProduct = cartProducts[i];
			if(singleProduct.productCode == product.productCode){
				cartProducts.splice(i,1);
				this.totalDetails.count=cartProducts.length;
				updateTotal();
				return;
			}
		}
		
	}
	cartService.getProductFromCart = function(){
		return cartProducts;
	}
	cartService.initialize();
	return cartService;
}]);