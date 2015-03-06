(function (module) {
  'use strict';

  module.directive('uiTabs', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        element.find('a').on('click', function (e) {
          e.preventDefault();
          $(this).tab('show');
        });

	      scope.$on('show.tab', function(event, tab) {
		      $(tab).tab('show');
	      });

        scope.$on('$destroy', function () {
          element.find('a').off();
        });
      }
    }
  });
})(angular.module('common.directives'));