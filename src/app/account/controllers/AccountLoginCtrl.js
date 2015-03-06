(function (module) {
  'use strict';

  module.controller('AccountLoginCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	  }
  ]);
})(angular.module('account'));