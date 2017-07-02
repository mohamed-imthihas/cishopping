app.factory("productService",['$http','ngDialog','storageService',function($http,ngDialog,storageService){
	var productService = {};
	var productData = undefined;
    var promise = $http.get('assets/data/productdata.json').success(function (data) {
      productData = data;
    });
    var favouriteProducts = [];
    var displayProducts = [];
    var dealProduct = null;
    var displayCategory = {"name":"Featured Products"};
    productService.promise = promise;
    favouriteProducts = storageService.fetchFav();
    if(favouriteProducts == undefined){
    	favouriteProducts=[];
    }
    productService.refresh = function(){
    	displayCategory = {"name":"Featured Products"};
    	displayProducts = [];
    }
    var chooseDealProduct = function(){
		var todayDate = new Date().toDateString();
		var s=0;
		for(var i=0;i<todayDate.length;i++){
			s+=parseInt(todayDate.charCodeAt(i));
		}
		var allProduct = productData.products;
		dealProduct = allProduct[s%allProduct.length];
		dealProduct.productPrice *= 0.8;
	}
	var getFeaturedProducts = function(){
		var featuredProduct = productData.featuredProducts;
		var allProduct = productData.products;
		var finalProductList =[];
		for(var i=0;i<featuredProduct.length;i++){
			for(var j=0;j<allProduct.length;j++){
				var singleProduct = allProduct[j];
				if(singleProduct.productCode == featuredProduct[i]){
					finalProductList.push(singleProduct);
					break;
				}
			}
		}
		return finalProductList;
	}
	var getCategoryId = function(name){
		var allMainList  = productData.categories;
		for(var i=0; i<allMainList.length;i++){
			if(name == allMainList[i].categoryName){
				return allMainList[i].categoryId;
			}
		}
		return 0;
	}
	var getSellerId = function(name){
		var allSellerType = productData.sellerType;
		for(var i=0;i<allSellerType.length;i++){
			if(allSellerType[i].sellerName == name){
				return allSellerType[i].sellerTypeId;
			}
		}
		return 0;	
	}
	var setIntoDisplayProductObject = function(arr){
		displayProducts.splice(0);
		for(var i=0;i<arr.length;i++){
			displayProducts.push(arr[i]);
			}
	}
	var changeDisplayProduct = function(){

		if(displayCategory.main == undefined){
			displayCategory.name="Featured Products";
			setIntoDisplayProductObject(getFeaturedProducts());
			return;
		}
		var sellerId = getSellerId(displayCategory.main);
		var catId = getCategoryId(displayCategory.sub);
		setIntoDisplayProductObject(getProducts(catId,sellerId));
		
	}
	var getProducts = function(catId,sellerId){
		var allProduct = productData.products;
		var finalProductList = [];
		for(var i=0;i<allProduct.length;i++){
			var singleProduct = allProduct[i];
			if((singleProduct.sellerType == sellerId || sellerId == 0) && (singleProduct.category == catId || catId == 0)){
				finalProductList.push(singleProduct);
			}
		}
		return finalProductList;
	}
	
	productService.getDisplayProducts = function(){
		changeDisplayProduct();
		return displayProducts;
	}
	
	productService.addToFavourite = function(product){

		ngDialog.open({"template":"<div class='center-align'><h2 >"+product.productName+"</h2><figure><img src='"+product.image+"'></figure><span> has been added to favourite</span></div>","plain":true,"className": 'ngdialog-theme-default'});

		for(var i=0;i<favouriteProducts.length;i++){
			var singleProduct = favouriteProducts[i];
			if(singleProduct.productCode == product.productCode){
				return;
			}
		}
		favouriteProducts.push(product);
		storageService.saveFav(favouriteProducts);
	}
	productService.getFavouriteProducts = function(){
		return favouriteProducts;
	}
	productService.removeFromFavourite = function(product){
		for(var i=0;i<favouriteProducts.length;i++){
			var singleProduct = favouriteProducts[i];
			if(singleProduct.productCode == product.productCode){
				favouriteProducts.splice(i,1);
				storageService.saveFav(favouriteProducts);
				return;
			}
		}
	}
	productService.getDealOfTheDay = function(){
		if(dealProduct == null){
			chooseDealProduct();
		}
		return dealProduct;
	}
	var getSubCategory = function(sellerId){
		var allMainList  = productData.categories;
		var categoryCount = [];
		var allProduct = productData.products;
		var allCount=0;
		for(var i=0;i<allMainList.length;i++){
			var count=0;
			for(var j=0;j<allProduct.length;j++){
				if(allProduct[j].category == allMainList[i].categoryId && (sellerId==0 || allProduct[j].sellerType == sellerId)){
					count++;
				}
			}
			categoryCount.push({"categoryName":allMainList[i].categoryName,"categoryCount":count});
			allCount+=count;
		}
		categoryCount.push({"categoryName":"All","categoryCount": allCount});
		categoryCount.sort(function(a,b){
			if(a.categoryName == "All")
				return -1;
			if(b.categoryName == "All"){
				return 1;
			}
			return a.categoryName.toLowerCase().localeCompare(b.categoryName.toLowerCase());
		});
		return categoryCount;
	}
	
	productService.getCategories= function(){
		var allCategories = [];
		allCategories.push({"name":"Categories","list": getSubCategory(0)});
		var allSellerType = productData.sellerType;
		for(var i=0;i<allSellerType.length;i++){
			if(allSellerType[i].sellerName != "Others"){
				allCategories.push({"name":allSellerType[i].sellerName,"list": getSubCategory(allSellerType[i].sellerTypeId)});
			}
		}
		return allCategories;
	}
	productService.setDisplayCategory = function(main,sub){
		displayCategory.name=main;
		if(sub!="All"){
			displayCategory.name+=" - "+sub;	
		}
		
		if(main=="Categories"){
			main=sub;
			displayCategory.name=main;
		}
		displayCategory.main = main;
		displayCategory.sub = sub;
		changeDisplayProduct();
	}
	productService.getDisplayCategory = function(){
		return displayCategory;
	}
	return productService;
}]);