app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:"partials/login.html",
		controller : "loginController"
	})
	.when("/home",{
		templateUrl:"partials/home.html",
		controller : "homeController",
		resolve:{
			"productServiceData":function(productService){
        	return productService.promise;
      		}
		}
	})
	.when("/favourite",{
		templateUrl:"partials/favourite.html",
		controller:"favouriteController",
		resolve:{
			"productServiceData":function(productService){
        	return productService.promise;
      		}
		}
	})
	.when("/cart",{
		templateUrl:"partials/cart.html",
		controller:"cartController",
		resolve:{
			"productServiceData":function(productService){
        	return productService.promise;
      		}
		}
	})
	.when("/confirm",{
		templateUrl:"partials/confirm.html",
		controller:"confirmController"
	})
	.when('/faq',{
		templateUrl:"partials/faq.html",
		controller:"faqController"
	})
	.when("/care",{
		templateUrl:"partials/customercare.html"
	})
	.otherwise({redirectTo:"/"});
}]);
