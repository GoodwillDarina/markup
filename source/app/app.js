require('angular-animate');
require('angular-scroll');
require('angular-touch');
require('ngmodal');

var app = angular.module('ngApp', ['ngAnimate', 'ngTouch', 'ngModal']);
app.controller('landingCtrl', [
  '$scope', '$timeout', '$document', function ($scope, $timeout, $document) {
    var isSubmitInProgress = false;
    $scope.isVideoShown = false;
    $scope.alert = {
      message: 'It is ok!',
      title: 'Success',
      isShow: false
    };
    $scope.loadPage = function () {
      $timeout(function () {
        $scope.isAnimate = $document[0].documentElement.clientWidth >= 1024;
      });
    };
    $scope.request = {
      username: '',
      email: ''
    };

    $scope.toggleVideo = function () {
      $scope.isVideoShown = !$scope.isVideoShown;
    };
    $scope.toggleAlert = function () {
      $scope.alert.isShow = !$scope.alert.isShow;
    };

    $scope.submitSubscribe = function (request) {
      if (isSubmitInProgress) {
        return;
      }
      isSubmitInProgress = true;

      //function for success message
      $timeout(function () {
        isSubmitInProgress = false;
        $scope.toggleAlert();
      });
    };

    $scope.onDraggable = function () {
      $scope.isAnimate = false;
    }
  }]);

app.directive('draggable', ['$document', '$window', '$timeout', function ($document, $window, $timeout) {
  return function (scope, element, attr) {
    $timeout(function () {
      var ua = window.navigator.userAgent.toLowerCase();
      var isIe = (/trident/gi).test(ua) || (/msie/gi).test(ua);
      var clientWidth = $document[0].documentElement.clientWidth;
      // var widthScrollbar = $window.innerWidth - clientWidth;

      if (!isIe && clientWidth >= 1024) {
        var mouseOffset;
        var newOffset = {
          x: null,
          y: null
        };
        var xPos, yPos;

        var areaDrag = element.parent();
        var areaPosition = {
          x: areaDrag[0].getBoundingClientRect().x,
          y: 0,
          x1: areaDrag[0].getBoundingClientRect().width - element[0].getBoundingClientRect().width,
          y1: areaDrag[0].getBoundingClientRect().height - element[0].getBoundingClientRect().height
        };
        var phoneBorder = element.next();

        var burger = phoneBorder.children().children();
        var burgerPosition = {
          x: burger[0].getBoundingClientRect().x,
          y: 230
        };


        element.on('mousedown', mousedown);

        function getMouseOffset(event) {
          var elementOffset = getElementOffset();
          return {
            x: event.pageX - elementOffset.x,
            y: event.pageY - elementOffset.y
          };
        }

        function mousedown(event) {
          event.preventDefault();

          mouseOffset = getMouseOffset(event);

          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
          return false;
        }

        function mousemove(event) {
          newOffset = calcPosition(event);

          element.css({
            top: newOffset.y + 'px',
            left: newOffset.x + 'px',
            bottom: 'auto',
            right: 'auto'
          });
          phoneBorder.css({
            top: newOffset.y + 'px',
            left: newOffset.x + 'px',
            bottom: 'auto',
            right: 'auto'
          });
          burger.css({
            top: burgerPosition.y - getElementOffset().y - 14 + 'px',
            left: burgerPosition.x - getElementOffset().x - 14 + 'px'
          });

          return false;
        }

        function mouseup() {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }

        function getElementOffset() {
          var de = $document[0].documentElement;
          var box = element[0].getBoundingClientRect();

          return {
            y: box.top + $window.pageYOffset - de.clientTop,
            x: box.left + $window.pageXOffset - de.clientLeft
          };
        }

        function calcPosition(elem) {
          var resultX, resultY;
          var xPos = elem.pageX - mouseOffset.x - areaPosition.x;
          var yPos = elem.pageY - mouseOffset.y - areaPosition.y;

          if (yPos >= 0 && yPos <= areaPosition.y1) {
            resultY = yPos;
          } else {
            if (yPos > areaPosition.y1) {
              resultY = areaPosition.y1;
            }
            else {
              resultY = 0;
            }
          }
          if (xPos >= 0 && xPos <= areaPosition.x1) {
            resultX = xPos;
          } else {
            if (xPos > areaPosition.x1) {
              resultX = areaPosition.x1;
            }
            else {
              resultX = 0;
            }
          }

          return {
            x: resultX,
            y: resultY
          }
        }

        element[0].addEventListener('touchstart', touchstart, false);

        function touchstart(event) {
          event.preventDefault();

          element.removeClass('is-animate');
          phoneBorder.removeClass('is-animate');
          burger.removeClass('is-animate');

          if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            mouseOffset = getMouseOffset(touch);

            element[0].addEventListener('touchmove', touchmove, false);
            element[0].addEventListener('touchend', touchend, false);
          }
        }

        function touchmove(event) {
          event.preventDefault();

          if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            newOffset = calcPosition(touch);

            element.css({
              top: newOffset.y + 'px',
              left: newOffset.x + 'px',
              bottom: 'auto',
              right: 'auto'
            });
            phoneBorder.css({
              top: newOffset.y + 'px',
              left: newOffset.x + 'px',
              bottom: 'auto',
              right: 'auto'
            });
            burger.css({
              top: burgerPosition.y - getElementOffset().y - 14 + 'px',
              left: burgerPosition.x - getElementOffset().x - 14 + 'px'
            });

            return false;
          }
        }

        function touchend() {
          element[0].removeEventListener('touchmove', touchmove);
          element[0].removeEventListener('touchend', touchend);
        }
      }
    });
  };
}]);
app.directive('fixedScroll', ['$document', '$window', function ($document, $window) {
  return function (scope, element, attr) {
    var clientWidth = $document[0].documentElement.clientWidth;
    var elementTop = element[0].getBoundingClientRect().top + $window.pageYOffset - $document[0].documentElement.clientTop;
    var elementBottom = $document[0].documentElement.querySelector('.footer').offsetTop;

    if($document[0].documentElement.scrollTop >= elementTop) {
      element.addClass('fixed');
    }

    if (clientWidth >= 1024) {
      $window.addEventListener('scroll', function () {
        var scrollTop = $document[0].documentElement.scrollTop;
        var scrollBottom = $document[0].documentElement.clientHeight + scrollTop;

        if(scrollTop >= elementTop && scrollBottom <= elementBottom) {
          element.addClass('fixed');
          element.removeClass('fixed-bottom');
        } else if(scrollTop < elementTop) {
          element.removeClass('fixed');
        } else if(scrollBottom >= elementBottom) {
          element.addClass('fixed-bottom');
        }
      })
    }
  };
}]);
