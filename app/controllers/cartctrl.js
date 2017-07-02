app.controller("cartController",['$scope','$location','productService','cartService',function($scope,$location,productService,cartService){
	var updateCart = function(vdo){
		vdo.cartProducts = cartService.getProductFromCart();
	}
	var removeProductFromCart = function(product){
		cartService.removeFromCart(product);
	}
	var changeQty = function(product){
		cartService.changeQuantity(product);
	}
	var productSelected = function(product){
		cartService.changeSelected(product);
	}
	var continueShop = function(){
		productService.refresh();
		$location.path("/home");
	}
	var checkOut = function(){
		cartService.checkOut();
		productService.refresh();
		$location.path("/confirm");
	}
	var init = function(vdo){
		updateCart(vdo);
		vdo.selected = cartService.getTotalItemSelected();
	}
	$scope.vdo = {
		"cartProducts":[],
		"removeProduct":removeProductFromCart,
		"changeQty":changeQty,
		"productSelected":productSelected,
		"continueShop":continueShop,
		"checkOut":checkOut,
		"selected":{}
	}
	init($scope.vdo);
}]);