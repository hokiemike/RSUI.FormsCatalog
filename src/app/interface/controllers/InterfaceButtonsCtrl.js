﻿(function (module) {
  'use strict';

  module.controller('InterfaceButtonsCtrl', [
	  '$scope', function ($scope) {
	    var vm = this;
	    vm.message = "test";
	  }
  ]);
})(angular.module('interface.controllers'));