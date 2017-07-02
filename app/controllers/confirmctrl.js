app.controller("confirmController",['$scope','$location',function($scope,$location){
	$scope.shopAgain = function(){
		$location.path('/home');
	}
	var init = function(){
		var text = "";
	    var possible = "0123456789";
	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    $scope.orderId = text;
	}
	init();
}]);