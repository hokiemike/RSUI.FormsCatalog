(function (module) {
  'use strict';

  module.controller('InterfaceTypographyCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	    vm.prettyPrintThis = '{ test: true; }';
	  }
  ]);
})(angular.module('interface.controllers'));