app.factory('storageService',['loginService','$window',function(loginService,$window){
	var storageService={};
	var shoppingData = [];
	var fetchData = function(){
		shoppingData = JSON.parse($window.localStorage.getItem('shoppingData'));
		if(shoppingData == undefined){
			shoppingData=[];
		}
	}
	fetchData();
	var saveData = function(){
		$window.localStorage.setItem('shoppingData',JSON.stringify(shoppingData));	
	}
	var saveProduct = function(type,product){
		var username = loginService.getUser().username;
		for(var i=0;i<shoppingData.length;i++){
			var singleData = shoppingData[i];
			if(singleData.username == username){
				singleData[type] = product;
				saveData();
				return;
			}
		}
		var singleData = {"username":username,"favourite":[],"cart":[]};
		singleData[type] = product;
		shoppingData.push(singleData);
		saveData();
	}
	var fetchProduct = function(type){
		var username = loginService.getUser().username;
		for(var i=0;i<shoppingData.length;i++){
			var singleData = shoppingData[i];
			if(singleData.username == username){
				return singleData[type];
			}
		}
		return;
	}
	storageService.saveFav = function(fp){
		saveProduct("favourite",fp);		
	}
	storageService.saveCart = function(cp){
		saveProduct("cart",cp);
	}

	storageService.fetchFav = function(){
		return fetchProduct("favourite");
	}
	storageService.fetchCart = function(){
		return fetchProduct("cart");
	}
	return storageService;
}]);