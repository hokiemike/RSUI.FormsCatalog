(function (module) {

	module.provider('uiService', function () {

		this.$get = function () {
			return {

				showPleaseWaitMessage: function () {
					$("#ajaxLoading").show();
				},

				hidePleaseWaitMessage: function () {
					$("#ajaxLoading").hide();
				}

			};
		}

	});
})(angular.module('common.providers'));