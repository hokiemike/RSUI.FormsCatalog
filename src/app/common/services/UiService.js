(function (module) {

  module.factory('UiService', function () {

    var showPleaseWaitMessage = function () {
      $("#ajaxLoading").show();
    };

    var hidePleaseWaitMessage = function () {
      $("#ajaxLoading").hide();
    };

    return {
      showPleaseWaitMessage: showPleaseWaitMessage,
      hidePleaseWaitMessage: hidePleaseWaitMessage
    };

  });
})(angular.module('common.services'));