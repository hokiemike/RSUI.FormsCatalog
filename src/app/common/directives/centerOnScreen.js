(function (module) {
  'use strict';

  module.directive('centerOnScreen', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        center(attrs.centerOnScreen);
        scope.$watch(attrs.centerOnScreen, function (value) {
          center(value);
        });

        function center(direction) {
          var $elem = $(element);
          if (!direction || direction === "both") {
            $elem.centerOnScreen();
          }
          else if (direction === "horizontally") {
            $elem.horizontallyCenterOnScreen();
          }
          else if (direction === "vertically") {
            $elem.verticallyCenterOnScreen();
          }
        }
      }
    };
  });
})(angular.module('common.directives'));