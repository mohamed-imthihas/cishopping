app.controller("categoryController",['$scope','$location','productService',function($scope,$location,productService){
	var changeCategory = function(maincategory,subcategory){
		productService.setDisplayCategory(maincategory,subcategory);
		$location.path("/home");
	}
	var toggleShow =function(index,vdo){
		for(i=0;i<vdo.categoriesList.length;i++){
			if(i==index)continue;
			vdo.show[i]=false;
		}
		vdo.show[index]=!vdo.show[index];
	}
	$scope.vdo={
		"categoriesList":[],
		"changeCategory":changeCategory,
		"toggleShow":toggleShow
	}
	var init=function(){
		$scope.vdo.categoriesList = productService.getCategories();	
	}
	init();
}]);