app.controller("favouriteController",
	['$scope','$location','productService','cartService',function($scope,$location,productService,cartService){
		var updateProducts = function(vdo){
			vdo.displayProducts = productService.getFavouriteProducts();
		}
		var removeFromFavourite = function(product){
			productService.removeFromFavourite(product);
		}
		var addToCart = function(product){
			cartService.addToCart(product);
		}
		var home = function(){
			productService.refresh();
			$location.path("/home");
		}
		$scope.vdo={
			"displayProducts":[],
			"removeFav":removeFromFavourite,
			"addCart":addToCart,
			"backToHome":home
		}
		var init = function(vdo){
			updateProducts(vdo);
		}
		init($scope.vdo);
}])