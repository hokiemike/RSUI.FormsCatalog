(function (module) {
  'use strict';

  module.controller('AccountProfileCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	  }
  ]);
})(angular.module('account'));