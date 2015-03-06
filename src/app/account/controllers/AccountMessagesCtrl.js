(function (module) {
  'use strict';

  module.controller('AccountMessagesCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	  }
  ]);
})(angular.module('account'));