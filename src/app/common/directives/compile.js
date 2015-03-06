angular.module('common.directives')
  .directive('compile', ['$compile', function ($compile) {
    return {
      link: function (scope, element, attrs) {
        scope.$watch(
          function (s) {
            return s.$eval(attrs.compile);
          },
          function (value) {
            element.html(value);
            $compile(element.contents())(scope);
          }
        );
      }
    }
  }]);