require('angular-animate');
require('angular-touch');
require('ngmodal');

var app = angular.module('ngApp', ['ngAnimate', 'ngTouch', 'ngModal', 'pascalprecht.translate']);
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if(!isMobile) {
  new SimpleBar(document.getElementById('wrap'));
}

var scrollElement, scrollContent;

app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
	'YT_URL': 'https://www.youtube.com/embed/b_cnm-30frQ?rel=0&enablejsapi=1',
	'INTRO_HEADING': 'AR editor & community on blockchain steroids',
	'INTRO_TEXT': 'Re-imagine the world around you by adding new features to ordinary objects. Enjoy the benefits of blockchain and earn cryptocurrency for helping our community.'
  });
 
  $translateProvider.translations('ru', {
	'YT_URL': 'https://www.youtube.com/embed/3l6YcgeC9lw?rel=0&enablejsapi=1',
	'INTRO_HEADING': 'AR editor & community on blockchain steroids',
	'INTRO_TEXT': 'Re-imagine the world around you by adding new features to ordinary objects. Enjoy the benefits of blockchain and earn cryptocurrency for helping our community.'
  });
  $translateProvider.fallbackLanguage('en');
  $translateProvider.uniformLanguageTag('iso639-1').determinePreferredLanguage();
}]);

app.controller('landingCtrl', [
  '$scope', '$timeout', '$document', '$window', function ($scope, $timeout, $document, $window) {
    var isSubmitInProgress = false;
    var clientWidth = $document[0].documentElement.clientWidth;

    $scope.isVideoShown = false;
    $scope.isConfirmShown = false;
    $scope.agreeUser = false;

    $scope.request = {
        username: '',
        email: ''
    };
    $scope.alert = {
      message: 'It is ok!',
      title: 'Success',
      isShow: false
    };
    $scope.loadPage = function() {
      $timeout(function () {
        $scope.isAnimate = clientWidth >= 1024;

        if (clientWidth >= 1024) {
          if(!isMobile) {
            scrollElement = $document[0].documentElement.querySelector('.page-wrap').querySelector('.simplebar-scroll-content');
            scrollContent = $document[0].documentElement.querySelector('.page-wrap').querySelector('.simplebar-content');
          } else {
            // scrollElement = $document[0].documentElement.querySelector('.page-wrap');
            scrollElement = $window;
            scrollContent = $document[0].documentElement;
          }

          var elementFixed = $document[0].documentElement.querySelector('.header-form');
          var elementTop = elementFixed.getBoundingClientRect().top + $window.pageYOffset - $document[0].documentElement.clientTop;
          var elementBottom = $document[0].documentElement.querySelector('.footer').offsetTop;


          scrollElement.addEventListener('scroll', function () {
            console.log('scr');
            var scrollTop = isMobile ? scrollContent.scrollTop : scrollElement.scrollTop;
            var scrollBottom = isMobile ? scrollContent.clientHeight + scrollTop : scrollElement.clientHeight + scrollTop;

            if(scrollTop >= elementTop && scrollBottom <= elementBottom) {
              elementFixed.classList.add('fixed');
              elementFixed.classList.remove('fixed-bottom');
            } else if(scrollTop < elementTop) {
              elementFixed.classList.remove('fixed');
            } else if(scrollBottom >= elementBottom) {
              elementFixed.classList.add('fixed-bottom');
            }
          })
        }
      });
    };

    $scope.toggleVideo = function() {
      $scope.isVideoShown = !$scope.isVideoShown;
    };
    $scope.toggleAlert = function() {
      $scope.alert.isShow = !$scope.alert.isShow;
    };
    $scope.toggleConfirm = function(isAgree) {
      $scope.isConfirmShown = !$scope.isConfirmShown;

      if(isAgree) {
        console.warn('agreeUser');
        $scope.toggleAlert();
      }
    };

    $scope.submitSubscribe = function(request) {
      if (isSubmitInProgress) {
        return;
      }
      isSubmitInProgress = true;

      //function for success message
      $timeout(function () {
        isSubmitInProgress = false;
        $scope.toggleConfirm();
      });
    };

    $scope.onDraggable = function() {
      $scope.isAnimate = false;
    };

  }]);

app.directive('draggable', ['$document', '$window', '$timeout', function ($document, $window, $timeout) {
  return function (scope, element, attr) {
    $timeout(function () {
      var ua = window.navigator.userAgent.toLowerCase();
      var isIe = (/trident/gi).test(ua) || (/msie/gi).test(ua);
      var clientWidth = $document[0].documentElement.clientWidth;

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
          y: burger[0].getBoundingClientRect().y
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
          var topCoord = isMobile ? $document[0].documentElement.clientTop: scrollContent.getBoundingClientRect().top;
          var leftCoord = isMobile ? $document[0].documentElement.clientLeft: scrollContent.getBoundingClientRect().left
          var box = element[0].getBoundingClientRect();

          return {
            y: box.top + $window.pageYOffset - topCoord,
            x: box.left + $window.pageXOffset - leftCoord
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
