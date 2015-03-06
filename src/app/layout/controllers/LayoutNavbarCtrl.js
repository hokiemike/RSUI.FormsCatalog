(function (module) {
	'use strict';

	module.controller('LayoutNavbarCtrl', [
	  '$scope', '$rootScope', 'AccountService', 'user', 'AvailableDepartments', function ($scope, $rootScope, acctSvc, user, availableDepartments) {
	  	var vm = this;
	  	vm.User = user;
	  	vm.allDepartments = [
				{ id: 10007, text: 'Alt Structures' },
				{ id: 10006, text: 'Binding Authority' },
				{ id: 300, text: 'Directors & Officers Liability' },
				{ id: 1800, text: 'GL' },
				{ id: 1900, text: 'Professional Liability' },
				{ id: 200, text: 'Property' },
				{ id: 100, text: 'Umbrella/Excess' }
	  	];

	  	if (user.Department) {
	  		if (_.findIndex(availableDepartments, { 'id': user.Department.Id }) >= 0)
	  			$rootScope.departmentId = user.Department.Id;
	  		else
	  			$rootScope.departmentId = 200;
	  		$rootScope.departmentObj = _.where(availableDepartments, { 'id': $rootScope.departmentId })[0];
	  	} else {
	  		availableDepartments = _.filter(vm.allDepartments, function (department) { return _.contains(_.pluck(user.Departments, 'id'), department.id); });
	  		if ($rootScope.departmentId == 0) {
	  			$rootScope.departmentId = availableDepartments[0].id;
	  		}
	  	}

	  	vm.departmentOptions = {
	  		allowClear: false,
	  		query: function (options) {
	  			var filtered = {
	  				more: false,
	  				results: availableDepartments
	  			}
	  			options.callback(filtered);
	  		},
	  		initSelection: function (element, callback) {
	  			callback({ id: element.val().id, text: element.val().text });
	  		}
	  	};

	  	vm.canSelectDepartment = function () {
	  		return !user.ExternalUser || (user.Departments && user.Departments.length > 1);
	  	}

	  	$scope.$watch('departmentObj', function (newValue, oldValue) {
	  		if (!angular.equals(newValue, oldValue)) {
	  			$rootScope.$broadcast('department.changed', newValue);
	  		}
	  	});
	  }
	]);
})(angular.module('layout.controllers'));