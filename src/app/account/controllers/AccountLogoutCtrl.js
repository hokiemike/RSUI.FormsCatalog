(function (module) {
  'use strict';

  module.controller('AccountLogoutCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	  }
  ]);
})(angular.module('account'));