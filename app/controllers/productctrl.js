app.controller("productController",['$scope','productService','cartService',function($scope,productService,cartService){
	var getDealProduct = function(vdo){
		vdo.dealProduct=productService.getDealOfTheDay();
	}
	var getDisplayCategory = function(vdo){
		vdo.productCategory = productService.getDisplayCategory();	
	}
	var getDisplayProducts = function(vdo){
		 vdo.displayProducts	= productService.getDisplayProducts();
	}
	var addToFavourite = function(product){
		productService.addToFavourite(product);
	}
	var addToCart = function(product){
		var isAdded = cartService.addToCart(product);
	}
	var init=function(vdo){
		getDisplayProducts(vdo);
		getDealProduct(vdo);
		getDisplayCategory(vdo);
	}
	$scope.vdo = {
		"productCategory":{},
		"displayProducts":[],
		"addCart":addToCart,
		"addFav":addToFavourite,
		"dealProduct":{}
	}
	init($scope.vdo);
}]);