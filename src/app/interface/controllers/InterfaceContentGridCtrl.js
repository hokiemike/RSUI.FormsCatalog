(function (module) {
  'use strict';

  module.controller('InterfaceContentGridCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	  }
  ]);
})(angular.module('interface.controllers'));