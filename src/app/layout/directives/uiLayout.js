(function (module) {
  'use strict';

  module.directive('uiLayout', ['$state', function ($state) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var navbar = '#' + attrs.uiLayoutNavbar;
        var sidebar = '#' + attrs.uiLayoutSidebar;

        /*
		     * As state changes, we need to set the classes for the UI Layout
		     */
        function updateUiLayout() {
          element.removeClass();
          element.addClass($state.current.data.classes.body);

          //var $navbar = element.find('#navbar-view');
          var $navbar = element.find(navbar);
          if ($navbar[0].className != $state.current.data.classes.navbar)
            $navbar.attr('class', $state.current.data.classes.navbar);

          //var $sidebar = element.find('#main-sidebar');
          var $sidebar = element.find(sidebar);
          if ($sidebar[0].className != $state.current.data.classes.sidebar)
            $sidebar.attr('class', $state.current.data.classes.sidebar);
        }

        scope.$on('$stateChangeSuccess', function () {
          setTimeout(function () { updateUiLayout(); }, 0);
        });

      }
    };
  }]);
})(angular.module('layout.directives'));