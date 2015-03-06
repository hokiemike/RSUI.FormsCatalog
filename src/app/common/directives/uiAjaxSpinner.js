(function (module) {
	'use strict';

	module.directive("uiAjaxSpinner", function () {
		return {
			link: function (scope, element) {
				scope.$on("ajax-start", function () {
					element.show();
				});
				scope.$on("ajax-stop", function () {
					element.hide();
				});
			}
		};
	});

})(angular.module('common.directives'));