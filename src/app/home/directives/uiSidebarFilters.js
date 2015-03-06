(function (module) {
	'use strict';

	module.directive('uiSidebarFilters', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			scope: {

			},
			link: function (scope, element, attrs) {

				var $ele = $(element);
				var pinned = false;
				$ele.mouseleave(function () {
					if (element.hasClass('show') && !pinned) {
						element.toggleClass('hide');
						element.toggleClass('show');
					}
				});

				$ele.mouseenter(function () {
					if (element.hasClass('hide') && !pinned) {
						$ele.toggleClass('show');
						$ele.toggleClass('hide');
					}
				});

				scope.$on('toggle.filters', function () {
					if (!pinned) {
						element.toggleClass('show');
						element.toggleClass('hide');
					}
				});

				scope.$on('toggle.filters.pin', function () {
					var $body = $('body');
					pinned = !$body.hasClass('pin-filters');
					$body.toggleClass('pin-filters');
				});
				//element.popover({
				//	//trigger: 'hover',
				//	trigger: 'focus',
				//	//trigger: 'manual',
				//	animate: false,
				//	container: 'body',
				//	placement: 'left',
				//	html: true,
				//	content: $compile('<div><b>test</b></div><div class="btn btn-xs btn-success" ng-click="home.clickme();">Edit</div>')(scope),
				//	title: 'Form Comments'
				//});
				////  .click(function (e) {
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