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
	'FEATURE_CHANGE_POINT_OF_VIEW': 'Discover the new world by looking from a different angle',
	'FEATURE_CHANGE_POINT_OF_VIEW_T_P1': 'Drimz is an ecosystem which is comprises the iOS AR-paint (Augmented Reality) tool and our in-house blockchain engine. This ecosystem is social and people-oriented: all the drawings you create with the application will be transparently available to others. They can evaluate it by voting. If the community likes your paintings, it will become public. If it does not - do not worry, we remove drawings after a certain time just like in Snapchat, thus you may be luckier the next time!',
	'FEATURE_CHANGE_POINT_OF_VIEW_T_P2': 'We invite you to get inspired by amazing augmented reality paintings created by our community, create your own virtual drawings, and share them with your friends! Reveal the best of you by expressing yourself and enjoy our AR-paint features for free!',	
	'FEATURE_ENCHANCE_BY_COLLABORATION': 'Enhance by collaboration',
	'FEATURE_ENCHANCE_BY_COLLABORATION_T_P1': 'When working on your drawing, free to join other people who share your idea, and help each other create the image that is on your mind. Additionally, if you like an idea of a different author, it is not necessary to do something similar from skratch. Instead, just modify their drawings and check what other people think about it.',
	'FEATURE_ENCHANCE_BY_COLLABORATION_T_P2': 'Enjoy connecting with teams when fulfilling your ideas, as this unleashes your creative powers and gives you a synergy shot. In Drimz, we will do our best to provide you with the tools to make this process easy, fun, and pleasant, allowing teams to complete complicated and spectacular canvases easily.',
	'FEATURE_EARN_ON_MODERATION': 'Earn crypto coins by helping our community',
	'FEATURE_EARN_ON_MODERATION_T_P1': 'We would like Drimz to be a great place to hang around with friends and family, and we would like to rely on your assistance in cleaning it from inappropriate, offensive, or meaningless content. Each your commitment to our AR-paint universe is rewarded: we give our crypto coins (DCN) each time you evaluate someone\'s drawing or spread a word about our service. We appreciate all your efforts to make our community bigger & better by promoting it to others!',
	'FEATURE_EARN_ON_MODERATION_T_P2': 'Our economy is pretty straightforward: Users enjoy viewing and creating small & cozy personal paintings, while Sponsors (business) pay their $$$ to create big, pompous, and astonishing expos to promote themselves and their products. The amounts they invest are divided among all the community members, also giving a piece of this pie to us to maintain our blockchain and develop Drimz.',	
	'FEATURE_EARN_ON_MODERATION_T_P3': 'The current exchange rate of DCN and the blockchain info is available at:',
	'FEATURE_EARN_ON_MODERATION_T_P4': '[ Vault ]',	
	'FEATURE_PERSONAL_EXPOS': 'Amuse only the closest people if you wish',
	'FEATURE_PERSONAL_EXPOS_T_P1': 'It is not always the case that you want to shout out to the world about your art, drawing, painting, or whatever you call it. Sometimes you just want to show it to someone special: to your best friends, your girlfriend or your mom - and nobody else. It could be a part of a present for an anniversary or a part of your intriguing quest: in all such cases, we would love to assist you and limit the number of people who can see your secret present. The private expos is not yet in the product for now, but it is a work in progress feature, and soon it will be generally available!',
	'FEATURE_NOGEO_EXPOS': 'Unbind geo-location and enjoy drawings locally',
	'FEATURE_NOGEO_EXPOS_T_P1': 'Some paintings definitely require geographical context and are best viewed only in certain places of our world. But. The majority of augmented reality paintings people create do not need this bind, and we feel unfair to hide this gold from other people. Thus, if you decide so, your painting will be available ONLY in a certain position and direction in the blockchain. Otherwise, it will fall into the can-see-it-everywhere category, and other AR fans will be able to view it in their location or even on their wall!',	
	'INTRO_TEXT': 'Re-imagine the world around you by adding new features to ordinary objects. Enjoy the benefits of blockchain and earn cryptocurrency for helping our community.'
  });

  $translateProvider.translations('ru', {
	'YT_URL': 'https://www.youtube.com/embed/3l6YcgeC9lw?rel=0&enablejsapi=1',
	'APP_TITLE': 'Редактор дополненной реальности, ставший соцсетью',	
	'APP_DESCRIPTION': 'Открой заново привычный мир. Узнай, что окружение, твой город и даже твоя квартира могут выглядеть иначе. Обычные предметы теперь полны сюрпризов и новых форм взаимодействия. Расскажи об этом всем и заработай на этом криптовалюту.',	
	'WATCH_VIDEO_BTN': 'СМОТРЕТЬ ВИДЕО',	
	'DRAG_ME_LABEL': 'Подвигай меня',
	'INTRO_HEADING': 'Редактор дополненной реальности, ставший соцсетью',
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
	'FEATURE_CHANGE_POINT_OF_VIEW': 'Блокчейн-сообщество в дополненной реальности',	
	'FEATURE_CHANGE_POINT_OF_VIEW_T_P1': 'Всё вокруг нас может быть другим, если посмотреть через гаджет. Вы подносите смартфон к меню в баре и видите дымящийся сочный стейк в его реальных размерах, а не плоское изображение. Ваши гости наводят смартфон на окно вашей квартиры на 11-м этаже, а мимо него проходит динозавр. Ваш шеф подмигивает вам со своей фотографии на столе, пока вы через смартфон изучаете кабинет. Технологии дополненной реальности и блокчейн стремительно захватывают мир.',
	'FEATURE_CHANGE_POINT_OF_VIEW_T_P2': 'Вся проблема – узнать, куда навести смартфон. Мы знаем, где опубликовать фотографию, видео или текст, чтобы их могли увидеть все. У образов (экспо) дополненной реальности нет таких платформ. Это сдерживает творческую энергию и не дает стать нашей реальности наконец дополненной. Мы в Drimz решили позволить этому потоку экспо захлестнуть всех нас, создав такую платформу.',	
	'FEATURE_ENCHANCE_BY_COLLABORATION': 'Дополненная реальность и блокчейн. Как из этого получилась соцсеть?',
	'FEATURE_ENCHANCE_BY_COLLABORATION_T_P1': 'В приложении Drimz мы соединили элементы социальной сети, AR (редактор дополненной реальности), блокчейн, а наполняет все криптовалюта. Мы создали что-то среднее между сообществом-соцсетью и видеохостингом, в котором есть свой инструмент для создания контента – ваших образов (экспо) дополненной реальности. Наш редактор использует технологию ARKit – прорыв 2017 года в дополненной реальности. Теперь экспо выглядят лучше, красочнее и подстраиваются под естественное освещение. Вам больше не нужно ломать голову, как выложить экспо в свои соцсети. Ваше творчество  сразу становится доступным остальным членам сообщества. Его оценивают голосованием, комментируют и распространяют. Если экспо действительно крутое, оно остается в публичном доступе. Если его не оценили - не переживайте, оно вскоре исчезнет, а вы сможете попытать счастье еще раз.',
	'FEATURE_ENCHANCE_BY_COLLABORATION_T_P2': 'Миссия команды Drimz - высвободить креативный потенциал. Пусть он забьет фонтаном! Для этого мы сделали нашу платформу на блокчейн максимально дружелюбной к творцам и поощряющей работу в сообществе. Представьте, сколько невероятных аттракционов из разных экспо и образов можно будет создать, если ваша команда – это целая соцсеть. Усы на Эйфелевой башне, к которым кто-то дорисует бороду, а кто-то колпак – это только для начала. Работая в сообществе, меняйте и дорабатывайте чужие экспо, объединяйтесь в команды художников, чтобы создавать остроумные и зрелищные образы в самых неожиданных местах.',
	'FEATURE_EARN_ON_MODERATION': 'Зачем Drimz криптовалюта как ее зарабатывать?',
	'FEATURE_EARN_ON_MODERATION_T_P1': 'Оказывается редактор дополненной реальности, блокчейн и криптовалюта – это то, что сможет вас по-настоящему развеселить. Социальное приложение Drimz построено на блокчейн. Но наше приложение  не только удобная среда для коммуникации с сообществом, но и своя криптовалюта. Криптовалюту можно зарабатывать каждый раз, когда вы оцениваете чью-то работу или рассказываете о нас кому-нибудь. Криптовалюта делает Drimz инструментом для маркетинга в дополненной реальности. Мы не сомневаемся, что в нашу систему придет бизнес и будет здесь зарабатывать репутацию. Мы создали для этого все условия.',
	'FEATURE_EARN_ON_MODERATION_T_P2': 'Экономика наша проста: есть криптовалюта, которую пользователи могут зарабатывать тем, что весело проводят время, получая удовольствие от процесса и оценивая экспо друг друга. Наша криптовалюта обеспечивается тем, что спонсоры (бизнес), что платят $$$ в систему, чтобы создать большие и помпезные экспо и продвинуть себя, свой бренд или свои продукты. Средства, которые они платят, делятся между членами нашего сообщества, и им выплачивается криптовалюта. Немного мы оставляем нашей команде, которая разрабатывает и поддерживает Drimz.',	
	'FEATURE_EARN_ON_MODERATION_T_P3': 'Криптовалюта DCN обменивается на USD и журнал транзакций и актуальный курс доступны тут:',
	'FEATURE_EARN_ON_MODERATION_T_P4': '[ Журнал ]',	
	'FEATURE_PERSONAL_EXPOS': 'Мы - блокчейн-инновация в маркетинге и рекламе',
	'FEATURE_PERSONAL_EXPOS_T_P1': 'Закрываем глаза, и представляем себе кликабельного клоуна, который каждый раз, когда вы смотрите на пешеходную улицу своего города через гаджет, зазывает вас зайти в ресторан, указывая к ней путь (а может и бежит впереди вас?). Реклама, которую пользователи сами распространят по всей блокчейн-сети, криптовалюта, которая позволяет зарабатывать на этом, и которую можно конвертировать в "аналоговые" деньги – вот что такое Drimz. Впрочем, кто-то из пользователей, конечно, может превратить этого клоуна в Пеннивайза Стивена Кинга и нашпиговать его цитатами из "Оно".',
	'FEATURE_NOGEO_EXPOS': 'Сотри границы и расстояния',
	'FEATURE_NOGEO_EXPOS_T_P1': 'Дополненная реальность – это не только усы на местном памятнике, реклама рок-концерта на оперном театре. Это возможность изменения вашего окружения под ваш вкус. В конце-концов, никто не мешает вам "повесить" на вашу новую тачку активную ссылку на ваш Инстаграм, чтобы все, кто пришел в восторг от авто, могли узнать у вас, чем вы заняты этим вечером… ну или попросить перепарковаться. Однако мы ценим не только творческий угар и глобальный охват, но и вашу приватность в сообществе. Поэтому, если вы решите, что ваше экспо может быть доступно ТОЛЬКО в определенном месте и направлении или только друзьям – так и будет. Впрочем, иначе, мы будем считать, что его можно просматривать везде: другие любители дополненной реальности смогут просмотреть его в своем дворе или даже у себя в квартире!',	
	'INTRO_TEXT': 'Открой заново привычный мир. Узнай, что окружение, твой город и даже твоя квартира могут выглядеть иначе. Обычные предметы теперь полны сюрпризов и кликабельны. Расскажи об этом всем и заработай на этом криптовалюту.'
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
