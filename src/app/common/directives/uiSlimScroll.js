(function (module) {
	'use strict';

	module.directive('uiSlimScroll', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var parent = element.parent();
				var height = parent[0].clientHeight;
				element.slimScroll({
					height: height - 60 //attrs.scrollHeight || 'auto'
				});
			}
		}
	});
})(angular.module('common.directives'));