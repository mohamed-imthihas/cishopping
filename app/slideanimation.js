app.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();
                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.vdo.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    jQuery(element).animate({"left":finishPoint+"px"},500,done);
                }
                else {
                    done();
                }
            },
            beforeRemoveClass:function (element, className, done) {
                var scope = element.scope();
                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.vdo.direction === 'right') {
                        startPoint = -startPoint;
                    }
                    jQuery(element).css("left",startPoint+"px");
                    done();
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                jQuery(element).animate({"left":"0px"},500,done)
                
            }
        };
    });
