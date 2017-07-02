app.controller('loginController',['$scope','$location','loginService',function($scope,$location,loginService){
	$scope.$on("errorMsg",function(event,arg){
		$scope.vdo.accessDenied = arg.errorOccured;
	});
	var login = function(vdo){
		var fields = vdo.fields;
		var userDet = {
			"username":fields.username,
			"password":fields.password
		}
		var isValidUser = loginService.login(userDet);
		if(isValidUser){
			vdo.showInvalidUser = false;
			$location.path("/home");
		}else{
			vdo.showInvalidUser = true;
		}
	}
	$scope.vdo ={
		'fields':{
			"username":"",
			"password":""
		},
		"accessDenied":false,
		'login':login,
		"showInvalidUser" : false
	};
	var init = function(){
		if($scope.userDetail.fullname != "Guest"){
			$location.path("/home");
		}
	}
	init();
}]);