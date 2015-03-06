(function (module) {
  'use strict';

  module.controller('LayoutSidebarCtrl', [
	  '$scope', 'AccountService', 'AppSettings', function ($scope, acctSvc, settings) {
	    var vm = this;
	    vm.message = 'Test';
	    vm.User = {};

	    function activate() {
	      acctSvc.getUser().then(
					function (user) { vm.User = user; },
					function (rejection) { vm.User = { FullName: 'Site User' }; });
	    }
	    activate();

	  }]);
})(angular.module('layout.controllers'));