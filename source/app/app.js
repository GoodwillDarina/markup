require('angular-animate');
require('angular-scroll');
require('angular-touch');
require('ngmodal');

var app = angular.module('ngApp', ['ngAnimate', 'ngModal']);
app.controller('landingCtrl', [
    '$scope', '$timeout', function ($scope, $timeout) {
        var isSubmitInProgress = false;
        $scope.isVideoShown = false;
        $scope.alert = {
            message: 'It is ok!',
            title: 'Success',
            isShow: false
        };
        $scope.request = {
            username: '',
            email: ''
        };

        $scope.toggleVideo = function() {
            $scope.isVideoShown = !$scope.isVideoShown;
        };
        $scope.toggleAlert = function() {
            $scope.alert.isShow = !$scope.alert.isShow;
        };

        $scope.submitSubscribe = function(request) {
            if (isSubmitInProgress) {
                return;
            }
            isSubmitInProgress = true;


            //function for success message
            $timeout(function() {
                isSubmitInProgress = false;
                $scope.toggleAlert();
            });
        };
    }]);

app.directive('draggable', ['$document', function($document) {
    return function(scope, element, attr) {
        var mouseOffset;
        var newOffset = {
            x: null,
            y: null
        };
        var xPos, yPos;

        var areaDrag = element.parent();
        var areaPosition = {
            x: areaDrag[0].getBoundingClientRect().x,
            y: areaDrag[0].getBoundingClientRect().y,
            x1: areaDrag[0].getBoundingClientRect().width - element[0].getBoundingClientRect().width,
            y1: areaDrag[0].getBoundingClientRect().height - element[0].getBoundingClientRect().height
        };
        var phoneBorder = element.next();

        var burger = phoneBorder.children().children();
        var burgerPosition = {
            x: burger[0].getBoundingClientRect().x,
            y: burger[0].getBoundingClientRect().y
        };

        function getMouseOffset(target, event) {
            var docPos = getPosition(target);
            return {x: event.pageX - docPos.x, y: event.pageY - docPos.y};
        }

        element.on('mousedown', mousedown);

        function mousedown(event) {
            event.preventDefault();

            mouseOffset = getMouseOffset(element, event);

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
            return false;
        }

        function mousemove(event) {
            xPos = event.pageX - mouseOffset.x - areaPosition.x;
            yPos = event.pageY - mouseOffset.y - areaPosition.y;

            if(yPos >= 0 && yPos <= areaPosition.y1) {
                newOffset.y = yPos;
            } else {
                if(yPos > areaPosition.y1) {
                    newOffset.y = areaPosition.y1;
                }
                else {
                    newOffset.y = 0;
                }
            }
            if(xPos >= 0 && xPos <= areaPosition.x1)  {
                newOffset.x = xPos;
            } else {
                if(xPos > areaPosition.x1){
                    newOffset.x = areaPosition.x1;
                }
                else {
                    newOffset.x = 0;
                }
            }
            console.log(mouseOffset);
            console.log(event.pageX, event.pageY);
            element.css({
                top: newOffset.y + 'px',
                left:  newOffset.x + 'px',
                bottom: 'auto',
                right: 'auto'
            });
            phoneBorder.css({
                top: newOffset.y + 'px',
                left:  newOffset.x + 'px',
                bottom: 'auto',
                right: 'auto'
            });
            burger.css({
                top: burgerPosition.y - phoneBorder[0].getBoundingClientRect().y - 80 + 'px',
                left: burgerPosition.x - phoneBorder[0].getBoundingClientRect().x - 18 + 'px'
            });
            return false;
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }

        function getPosition(elem) {
            return {x: elem[0].getBoundingClientRect().left, y: elem[0].getBoundingClientRect().top};
        }
    };
}]);
