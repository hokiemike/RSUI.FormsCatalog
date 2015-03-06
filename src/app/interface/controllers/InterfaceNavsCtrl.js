(function (module) {
  'use strict';

  module.controller('InterfaceNavsCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	  }
  ]);
})(angular.module('interface.controllers'));