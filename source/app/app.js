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
        var mouseOffset, newOffset;
        var xPos, yPos;
        var areaDrag = element.parent();
        var areaPosition = {
            x: areaDrag[0].getBoundingClientRect().x,
            y: areaDrag[0].getBoundingClientRect().y,
            x1: areaDrag[0].getBoundingClientRect().width - element[0].getBoundingClientRect().width,
            y1: areaDrag[0].getBoundingClientRect().height - element[0].getBoundingClientRect().height
        };
        var phoneBorder = element.next();


        function getMouseOffset(target, event) {
            var docPos = getPosition(target);
            return {x: event.pageX - docPos.x, y: event.pageY - docPos.y};
        }

        element.on('mousedown', function(event) {
            event.preventDefault();

            // получить сдвиг элемента относительно курсора мыши
            mouseOffset = getMouseOffset(element, event);

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
            return false;
        });

        function mousemove(event) {
            xPos = event.pageX - mouseOffset.x - areaPosition.x;
            yPos = event.pageY - mouseOffset.y - areaPosition.y;

            if(yPos <= 0 || xPos <= 0) {
                newOffset = {
                    y: yPos <= 0 ? 0 : yPos,
                    x: xPos <= 0 ? 0 : xPos
                };
            } else if(yPos >= areaPosition.y1 || xPos >= areaPosition.x1){
                newOffset = {
                    y: yPos >= areaPosition.y1 ? areaPosition.y1 : yPos,
                    x: xPos >= areaPosition.x1 ? areaPosition.x1 : xPos
                };
            } else {
                newOffset = {
                    y: yPos,
                    x: xPos
                };
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



