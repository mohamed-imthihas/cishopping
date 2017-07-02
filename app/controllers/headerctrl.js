app.controller('headerController',['$scope','$location','$window','loginService','cartService',function($scope,$location,$window,loginService,cartService){
	var userDetails={};
	var getUserDetails = function(vdo){
		userDetails = loginService.getUser(); 
		vdo.userDetail =userDetails;
	}
	var getCartDetails = function(vdo){
		vdo.cartDetail = cartService.getTotalItemSelected();
	}
	var isGuestUser = function(){
		if(userDetails.isLogged == false){
			return true;
		}
		return false;
	}
	var isAuxillaryLink = function(){
		if($location.path() == "/faq" ||$location.path() == "/care"){
			return true;
		}
		return false;
	}
	var myFav = function(){
		if(isGuestUser()){
			$location.path("/");
			$scope.$broadcast("errorMsg",{"errorOccured":true});
			return;
		}
		$location.path("/favourite");
	}
	var myCart = function(){
		if(isGuestUser()){
			$location.path("/");
			$scope.$broadcast("errorMsg",{"errorOccured":true});
			return;
		}
		$location.path("/cart");
	}
	var loggedOut = function(vdo){
		loginService.logOut();	
		$location.path("/");
		$window.location.reload();
	}
	var home = function(){
		console.log("home");
		$location.path("/home");
		$window.location.reload();	
	}
	
	$scope.$on('$routeChangeStart', function(next, current) {
		cartService.initialize();
		if(isAuxillaryLink()){
			return;
		}
		if(isGuestUser()){
			$location.path("/");
			return;
		}
		if($location.path() == "/confirm" && !$scope.vdo.cartDetail.isCheckOut){
			$location.path("/home");
		}
   		if($location.path()!="/confirm"){
   			$scope.vdo.cartDetail.isCheckOut = false;
   		}
 	});
 	$scope.vdo ={
		"userDetail":{},
		"myFav":myFav,
		"myCart":myCart,
		"loggedOut":loggedOut,
		"cartDetail":{},
		"home":home
	}
	var init = function(vdo){
		getUserDetails(vdo);
		getCartDetails(vdo);
		$scope.userDetail = userDetails;
		if(isAuxillaryLink()){
			return;
		}
		if(isGuestUser()){
			$location.path("/");
			return;
		}
	}
	init($scope.vdo);
}]);