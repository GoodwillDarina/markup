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

app.directive('draggable', ['$document', '$window', function($document, $window) {
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
            var elementOffset = getPosition(target);

            return {
                x: event.pageX - elementOffset.x,
                y: event.pageY - elementOffset.y
            };
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
                top: burgerPosition.y - getElementOffset().y - 80 + 'px',
                left: burgerPosition.x - getElementOffset().x - 18 + 'px'
            });

            console.warn("mousemove (phoneBorder)", element[0].getBoundingClientRect().x, getElementOffset().x);
            return false;
        }

        function getElementOffset() {
            var de = $document[0].documentElement;
            var box = element[0].getBoundingClientRect();


            return {
                y: box.top + $window.pageYOffset - de.clientTop,
                x: box.left + $window.pageXOffset - de.clientLeft
            };
        }
        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }

        function getPosition(elem) {
            var de = $document[0].documentElement;
            var box = elem[0].getBoundingClientRect();

            return {
                y: box.top + $window.pageYOffset - de.clientTop,
                x: box.left + $window.pageXOffset - de.clientLeft
            };
        }
    };
}]);
