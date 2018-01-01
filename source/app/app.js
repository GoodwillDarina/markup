require('angular-animate');
require('angular-touch');
require('ngmodal');

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var scrollElement, scrollContent;

if(!isMobile) {
  new SimpleBar(document.getElementById('wrap'));
}

var app = angular.module('ngApp', ['ngAnimate', 'ngTouch', 'ngModal', 'pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
	'YT_URL': 'https://www.youtube.com/embed/b_cnm-30frQ?rel=0&enablejsapi=1',
	'APP_TITLE': 'Social AR Paint for iOS with Blockchain and Cryptocurrency',
	'APP_DESCRIPTION': 'View amazing AR (Augment Reality) paintings, create your own, and earn crypto coins for helping our community. Drimz is an iOS application with own blockchain and crypto currency DCN.',
	'WATCH_VIDEO_BTN': 'WATCH VIDEO',
	'DRAG_ME_LABEL': 'DRAG ME',
	'INTRO_HEADING': 'AR editor & community on blockchain steroids',
	'PRE_ICO_FORM_HERO_LABEL': 'Learn more about us and our investment offer (pre-ICO):',
	'PRE_ICO_FORM_HERO_LABEL_M': 'Learn more about us and our investment offer (pre-ICO)',
	'PRE_ICO_FORM_NAME_PLACEHOLDER': 'Name',
	'PRE_ICO_FORM_EMAIL_PLACEHOLDER': 'Email',
	'PRE_ICO_FORM_SEND_BTN': 'Learn More',
	'PRE_ICO_UA_TITLE': '',	
	'PRE_ICO_UA_TEXT': 'I hereby agree that my name and email will be received by this website for further use limited by points stated in our T&C document.',
	'PRE_ICO_SUBMIT_BTN': 'Submit Inquiry',
	'PRE_ICO_SUBMIT_SUCCESS_TITLE': 'Successfully Sent!',
	'PRE_ICO_SUBMIT_SUCCESS_TEXT': 'Thank you for your inquiry, we\'ll do our best to promptly contact you and provide all the necessary information to help you make the decision about participating in our ICO.',
	'INTRO_TEXT': 'Re-imagine the world around you by adding new features to ordinary objects. Enjoy the benefits of blockchain and earn cryptocurrency for helping our community.'
  });

  $translateProvider.translations('ru', {
	'YT_URL': 'https://www.youtube.com/embed/3l6YcgeC9lw?rel=0&enablejsapi=1',
	'APP_TITLE': 'Социальный редактор AR (дополненной реальности) для iOS блокчейном и криптовалютой',	
	'APP_DESCRIPTION': 'Просматривайте восхитительные образы AR (дополненной реальности), создавайте свои, и зарабатывайте криптовалюту, помогая сообществу. Дримз - это iOS приложение с собственным блокчейн и криптовалютой DCN.',	
	'WATCH_VIDEO_BTN': 'СМОТРЕТЬ ВИДЕО',	
	'DRAG_ME_LABEL': 'Подвигай меня',
	'INTRO_HEADING': 'AR редактор и сообщество c блокчейном и криптовалютой',
	'PRE_ICO_FORM_HERO_LABEL': 'Узнайте о нас и об инвестициях в наш проект (pre-ICO):',
	'PRE_ICO_FORM_HERO_LABEL_M': 'Узнайте о нас и об инвестициях в наш проект (pre-ICO)',	
	'PRE_ICO_FORM_NAME_PLACEHOLDER': 'Имя',
	'PRE_ICO_FORM_EMAIL_PLACEHOLDER': 'Email',	
	'PRE_ICO_FORM_SEND_BTN': 'Узнать больше',
	'PRE_ICO_UA_TITLE': '',
	'PRE_ICO_UA_TEXT': 'Я подтверждаю свое согласие на обработку своих персональных данных (имени и email) в соответствии с правилами обработки, хранения и использования персональных данных, приведенными в следующем документе.',	
	'PRE_ICO_SUBMIT_BTN': 'Отправить заявку',
	'PRE_ICO_SUBMIT_SUCCESS_TITLE': 'Отправка успешна!',
	'PRE_ICO_SUBMIT_SUCCESS_TEXT': 'Спасибо за заявку, в ближайшее время мы свяжемся с Вами и предоставим всю информацию о нашем проекте, которая поможет Вам принять решение об участии в нашем pre-ICO.',	
	'INTRO_TEXT': 'Преобрази мир вокруг себя, создавая новые идеи и образы из обыденных и привычных вещей. Используй преимущества блокчейн и получай криптовалюту за помощь сообществу.'
  });
  $translateProvider.fallbackLanguage('en');
  $translateProvider.uniformLanguageTag('iso639-1').determinePreferredLanguage();
}]);

app.controller('landingCtrl', [
  '$scope', '$timeout', '$document', '$window', function ($scope, $timeout, $document, $window) {
    var isSubmitInProgress = false;
    var clientWidth = $document[0].documentElement.clientWidth;
    var header = $document[0].documentElement.querySelector('.header');
    var headerForm = $document[0].documentElement.querySelector('.header-form');
    var headerFormHeightInit, headerHeight;

    $scope.isVideoShown = false;
    $scope.isLoadDrag = false;
    $scope.isOpenForm = false;
    $scope.isConfirmShown = false;
    $scope.agreeUser = false;

    $scope.isShownMobile = clientWidth < 1024;

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

        if(!isMobile) {
          scrollElement = $document[0].documentElement.querySelector('.page-wrap').querySelector('.simplebar-scroll-content');
          scrollContent = $document[0].documentElement.querySelector('.page-wrap').querySelector('.simplebar-content');
        } else {
          scrollElement = $window;
          scrollContent = $document[0].documentElement;
        }
        var elementFixed = $document[0].documentElement.querySelector('.header-form');
        var elementTop = elementFixed.getBoundingClientRect().top + $window.pageYOffset - $document[0].documentElement.clientTop;
        var elementBottom = $document[0].documentElement.querySelector('.footer').offsetTop;


        scrollElement.addEventListener('scroll', function () {
          var scrollTop = isMobile ? scrollContent.scrollTop : scrollElement.scrollTop;
          var scrollBottom = isMobile ? scrollContent.clientHeight + scrollTop : scrollElement.clientHeight + scrollTop;
          if(clientWidth >= 1024) {
            if(scrollTop >= elementTop && scrollBottom <= elementBottom) {
              elementFixed.classList.add('fixed');
              elementFixed.classList.remove('fixed-bottom');
            } else if(scrollTop < elementTop) {
              elementFixed.classList.remove('fixed');
            } else if(scrollBottom >= elementBottom) {
              elementFixed.classList.add('fixed-bottom');
            }
          } else {
            if(scrollTop >= elementTop) {
              elementFixed.classList.add('fixed');
            } else if(scrollTop < elementTop) {
              elementFixed.classList.remove('fixed');
            }
          }

        });


        $scope.isLoadDrag = true;

        if(clientWidth < 1024) {
            headerFormHeightInit = headerForm.offsetHeight;
            headerHeight = header.offsetHeight;
            header.style.height = headerHeight + 'px';
        }
      });
    };

    $scope.toggleVideo = function() {
      $scope.isVideoShown = !$scope.isVideoShown;
    };
    $scope.toggleAlert = function() {
      $scope.alert.isShow = !$scope.alert.isShow;
	  
	  if ($scope.alert.isShow == true) {
		  var i = firebase.database().ref().child("clients").push().key;
		  
		  firebase.database().ref("clients/" + i).set({
			id: i,
			name: $scope.request.username,
			email: $scope.request.email,
			date: (new Date).toLocaleString("ru"),
			timestamp: Math.floor(Date.now() / 1e3)
		  }); 		  
	  }
	  
    };
    $scope.toggleForm = function() {

      $scope.isOpenForm = !$scope.isOpenForm;

      $timeout(function() {
        header.style.height = headerHeight - headerFormHeightInit + headerForm.offsetHeight + 'px';
      });
    };
    $scope.toggleConfirm = function(isAgree) {
      $scope.isConfirmShown = !$scope.isConfirmShown;

      if(isAgree) {
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
        if(!$scope.isShownMobile) {
          $scope.toggleConfirm();
        } else {
          $scope.toggleAlert();
        }
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
          x: burger[1].getBoundingClientRect().x,
          y: burger[1].getBoundingClientRect().y
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
          var topCoord = isMobile ? $document[0].documentElement.clientTop : scrollContent.getBoundingClientRect().top;
          var leftCoord = isMobile ? $document[0].documentElement.clientLeft : scrollContent.getBoundingClientRect().left;
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
