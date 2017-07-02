app.controller("homeController",['$scope','productService','$timeout',function($scope,productService,$timeout){
	var slides = [
            {image: 'assets/images/slides1.jpg', description: 'Cool iPhones'},
            {image: 'assets/images/slides2.png', description: 'Compact Bags'},
            {image: 'assets/images/slides3.jpg', description: 'Elegant Dresses'},
            {image: 'assets/images/slides4.png', description: 'Fabulous iPads'},
            {image: 'assets/images/slides5.jpg', description: 'Stylish Shoes'}
        ];
        var bool=false;
        var time = function(){
            bool=true;
            $timeout(function() {
                bool=false;
            }, 1000);
        }
        var prevSlide = function (vdo) {
            if(bool == true){
                return;
            }
            time();
            vdo.direction = 'right';
            vdo.currentIndex = (vdo.currentIndex > 0) ? --vdo.currentIndex : vdo.slides.length - 1;
        };
        var nextSlide = function(vdo){
            if(bool == true){
                return;
            }
            time();
            vdo.direction = 'left';
            vdo.currentIndex = (vdo.currentIndex < vdo.slides.length - 1) ? ++vdo.currentIndex : 0;
        }
        var setCurrentSlideIndex = function (vdo,index) {
            vdo.direction = (index > vdo.currentIndex) ? 'left' : 'right';
            vdo.currentIndex = index;
        };
        var isCurrentSlideIndex = function (vdo,index) {
            return vdo.currentIndex === index;
        };
        $scope.vdo ={
            "direction" : 'left',
            "currentIndex" : 0,
            "setCurrentSlideIndex" :setCurrentSlideIndex,
            "isCurrentSlideIndex" : isCurrentSlideIndex,
            "prevSlide" : prevSlide,
            "nextSlide" : nextSlide,
            "slides":slides    
        }
         
        var slideTimer =
            $timeout(function interval() {
                nextSlide($scope.vdo);
              slideTimer = $timeout(interval, 5000);
            }, 5000);
}]);