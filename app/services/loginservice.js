app.factory('loginService',['$http','$window',function($http,$window){
	var loginService = {};
	var users = [];
	var userDetail = {"fullname":"Guest","isLogged":false};
	/*loginService.currentUser = null;*/
	var loadUsers = function(){
		$http.get("assets/data/userdata.json")
		.then(function(response){
				users = response.data;
		});
	}
	loginService.getUser = function(){
		var tempuser = JSON.parse($window.sessionStorage.getItem("shoppingUser"));
		if(tempuser!=undefined){
			userDetail.fullname = tempuser.fullname;
			userDetail.username = tempuser.username;
			userDetail.isLogged = true;
		}
		return userDetail;
	}
	loginService.login = function(params){
		for(i=0;i<users.length;i++){
			var user = users[i];
			if(user.username == params.username && user.password == params.password){
				userDetail.fullname = user.fullname;
				userDetail.username = user.username;
				userDetail.isLogged = true;
				$window.sessionStorage.setItem("shoppingUser",JSON.stringify(userDetail));
				return true;
			}
		}

		return false;
	}
	loginService.logOut = function(){
		$window.sessionStorage.removeItem("shoppingUser");
		userDetail.isLogged = false;
		userDetail.fullname = "Guest";
		userDetail.username = "";
	}
	loadUsers();
	return loginService;
}]);