(function (module) {
  'use strict';

  module.controller('InterfacePanelOptionsCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	  }
  ]);
})(angular.module('interface.controllers'));