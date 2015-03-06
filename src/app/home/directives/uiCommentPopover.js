(function (module) {
  'use strict';

  module.directive('uiCommentsPopover', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        form: '@uiCommentsPopover'
      },
      link: function (scope, element, attrs) {
        var form = scope.$eval(attrs.uiCommentsPopover);
        var comments = form.Comments === null ? 'N/A' : form.Comments;
        element.popover({
          //trigger: 'hover',
          trigger: 'focus',
          //trigger: 'manual',
          animate: false,
          container: 'body',
          placement: 'left',
          html: true,
          content: $compile('<div><b>' + scope.form.Comments + '</b></div><div class="btn btn-xs btn-success" ng-click="home.clickme(' + scope.form + ');">Edit</div>')(scope),
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

        attrs.$observe('uiCommentsPopover', function (newValue, oldValue) {
          console.log('attrs.$observe: ' + scope.$eval(newValue));
        });
	      scope.$watch(scope.form, function (newValue, oldValue) {
          console.log('scope.$watch: ' + scope.$eval(newValue));
        });
        scope.$watch(function () { return attrs.uiCommentsPopover; }, function (newValue, oldValue) {
          element.popover({
            //trigger: 'hover',
            trigger: 'focus',
            //trigger: 'manual',
            animate: false,
            container: 'body',
            placement: 'left',
            html: true,
            content: $compile('<div><b>' + newValue + '</b></div><div class="btn btn-xs btn-success" ng-click="home.clickme(' + attrs.uiCommentsPopover + ');">Edit</div>')(scope),
            title: 'Form Comments'
          });
        });

      }
    }
  }]);
})(angular.module('home.directives'));