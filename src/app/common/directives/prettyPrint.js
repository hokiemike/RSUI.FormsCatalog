(function (module) {
  'use strict';

  module.directive('prettyprint', function () {

    function replaceText(str) {
      var str1 = String(str);
      return str1.replace(/\n/g, "<br/>").replace(/ /g, '&nbsp;');
    }

    return {
      restrict: 'C',
      scope: {
        startingLineNumber: '='
      },
      link: function (scope, element, attrs) {
        // using setTimeout to delay so all Double-Curly binding can take place
        setTimeout(function () {

          // we need to see if the startingLineNumber is present, or not. As well as linenums class.
          var linenum = scope.startingLineNumber ? scope.startingLineNumber : element.hasClass('linenums');

          // Now prettyPrint
          element.html(prettyPrintOne(replaceText(element.html()), '', linenum));
        }, 0);
      }
    };
  });
})(angular.module('common.directives'));