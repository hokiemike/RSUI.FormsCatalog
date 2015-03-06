(function (module) {
  'use strict';

  module.directive('uiFormGroup', ['$compile', function ($compile) {
    return {
      restrict: 'A',
	  scope: {
		  
	  },
      link: function (scope, element, attrs) {
        element.popover({
          //trigger: 'hover',
          trigger: 'focus',
          //trigger: 'manual',
          animate: false,
          container: 'body',
          placement: 'left',
          html: true,
          content: $compile('<div><b>test</b></div><div class="btn btn-xs btn-success" ng-click="home.clickme();">Edit</div>')(scope),
          title: 'Form Comments'
        });
        //  .click(function (e) {
        //  e.preventDefault();
        //  element.popover('hide');
        //}).mouseenter(function (e) {
        //  scope.$emit('showing.comments');
        //    $('button[ui-comments-popover]').not(element).popover('hide');
        //  element.popover('show');
        //});
      }
    }
  }]);
})(angular.module('home.directives'));