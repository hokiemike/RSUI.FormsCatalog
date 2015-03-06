(function (module) {
  'use strict';

  module.directive('uiSidebar', ['AppSettings', function (appSettings) {

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        // Set class based on type of li
        element.children('li').addClass('root');
        element.find('li').has('ul').children('a').parent('li').addClass('has-ul');

        // hide ul and slide up
        element.find('li').not('.active').has('ul').children('ul').not('.opened').addClass('hidden-ul');
        element.find('li.has-ul').not('.disabled').removeClass('opened').children('ul').slideUp(250);

        // set the active on the current active current-state and slide all ul
        element.find('a.active.current-state').parents('li').addClass('active');
        element.find('a.active.current-state').parents('li.has-ul').addClass('opened').children('ul').slideToggle(250);

        // Jquery Events
        $(document).on('click', '.sidebar-toggle', function (e) {
          e.preventDefault();
          $('body').toggleClass('sidebar-narrow');
          checkBody();
        });

        $(document).on('click', '.navbar-toggle.offcanvas', function (e) {
          e.preventDefault();
          $('body').toggleClass('offcanvas-active');
          checkBody();
        });

        element.find('li').has('ul').children('a').on('click', function (e) {
          e.preventDefault();
          if ($('body').hasClass('sidebar-narrow')) {
            $(this).parent('li > ul li').not('.disabled').siblings().removeClass('opened').children('ul').slideUp(250);
            $(this).parent('li > ul li').not('.disabled').toggleClass('opened').children('ul').slideToggle(250);
          }

          else {
            $(this).parent('li').not('.disabled').siblings().removeClass('opened').children('ul').slideUp(250);
            $(this).parent('li').not('.disabled').toggleClass('opened').children('ul').slideToggle(250);
          }
        });

        element.find('li').not('.has-ul').find('a').on('click', function (e) {
          e.preventDefault();

          $(this).parent('li').siblings().removeClass('opened').children('ul').slideUp(250);
          $(this).parent('li').siblings().find('li.opened').removeClass('opened').children('ul').slideUp(250);

          // root li
          var $rootParent = $(this).parents('li.root');
          $('.navigation').find('li.active').not($rootParent).removeClass('active');

          // All 'li' up
          $(this).parents('li').addClass('active');

          // All 'li' down from siblings ( submenus )
          $(this).parent('li').siblings().find('li.active').removeClass('active');

          //All 'li' siblings
          $(this).parent('li').siblings().removeClass('active');

          if (appSettings.toggleOffCanvasOnClick && $('body').hasClass('offcanvas-active')) {
            $('body').toggleClass('offcanvas-active');
          }
        });

        // Local function
        function checkBody() {
          if ($('body').hasClass('sidebar-narrow')) {
            $('.navigation').children('li').children('ul').css('display', '');

            $('.sidebar-content').hide().delay().queue(function () {
              $(this).show().addClass('animated fadeIn').clearQueue();
            });
          }

          else {
            $('.navigation').children('li').children('ul').css('display', 'none');
            $('.navigation').children('li.active').children('ul').css('display', 'block');

            $('.sidebar-content').hide().delay().queue(function () {
              $(this).show().addClass('animated fadeIn').clearQueue();
            });
          }
        };

        // Angular Events
        scope.$on('$destroy', function () {
          element.find('li').not('.has-ul').find('a').off();
          element.find('li').has('ul').children('a').off();
          $(document).off('click', '.sidebar-toggle');
          $(document).off('click', '.navbar-toggle.offcanvas');

        });

        scope.$on('bodyClassesChanged', function () {
          setTimeout(function () {
            checkBody();
          }, 0);
        });
      }
    }
  }]);
})(angular.module('layout.directives'));