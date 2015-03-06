(function (module) {
  'use strict';

  module.factory('AccountService', [
    '$http', '$q', 'UrlService', 'AmplifyService', 'Logger', function ($http, $q, apiSvc, storage, logger) {
      return {
        getEmployeeByUserProfile: getEmployeeByUserProfile,
        getTeamLeader: getTeamLeader,
        getRoles: getRoles,
        getEmployeeStatuses: getEmployeeStatuses,
        getClientUser: getClientUser,

        lookupEmployees: lookupEmployees,
        lookupDepartments: lookupDepartments,
        lookupEmployeeTypes: lookupEmployeeTypes,
        lookupBranches: lookupBranches,
        lookupBranchFloors: lookupBranchFloors,
        lookupOrgUnits: lookupOrgUnits,
        lookupTeams: lookupTeams,
        lookupEmployeeStatuses: lookupEmployeeStatuses,

        save: save,
        setUser: setUser,
        getUser: getUser,

        isAuthenticated: isAuthenticated,
        hasRole: hasRole,
        userHasRole: userHasRole
      };

      function getEmployeeByUserProfile(userProfile) {
        var deferred = $q.defer();
        $http.get(apiSvc.buildApiUrl('/api/management/employee/' + userProfile)).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function getTeamLeader(teamId) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl({ controller: 'Accounts', subpath: ['lookup', 'team', 'leader'] }), { TeamId: teamId }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function getRoles() {
        var deferred = $q.defer();
        $http.get(apiSvc.apiUrlFor({ controller: 'Accounts', subpath: ['auth', 'roles'] })).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject(response); });
        return deferred.promise;
      }

      function getClientUser() {
        var deferred = $q.defer();
        $http.get(apiSvc.apiUrlFor({ controller: 'Accounts', subpath: ['auth', 'client'] })).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject(response); });
        return deferred.promise;
      }

      function getEmployeeStatuses() {
        var deferred = $q.defer();
        $http.get(apiSvc.buildApiUrl({ controller: 'Accounts', subpath: ['lookup', 'employee', 'status'] })).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function lookupEmployees(options, pageSize, isActive) {
        if (typeof isActive === "undefined" || isActive === null) {
          isActive = true;
        }
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/lookup/employee/search/'), { Page: options.page, PageSize: pageSize, Term: options.term, IsActive: isActive }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function lookupDepartments(options, pageSize) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/lookup/employee/departments/'), { Page: options.page, PageSize: pageSize, Term: options.term }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function lookupEmployeeTypes(options, pageSize) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/lookup/employee/types/'), { Page: options.page, PageSize: pageSize, Term: options.term }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function lookupBranches(options, pageSize) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/lookup/branches/'), { Page: options.page, PageSize: pageSize, Term: options.term }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function lookupBranchFloors(options, branch, pageSize) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/lookup/branch/floors/'), { Page: options.page, PageSize: pageSize, Term: options.term, BranchId: branch }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function lookupOrgUnits(options, pageSize) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/lookup/orgunits/'), { Page: options.page, PageSize: pageSize, Term: options.term }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function lookupTeams(options, employeeId, departmentId, pageSize) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/lookup/employee/teams/'), { Page: options.page, PageSize: pageSize, Term: options.term, EmployeeId: employeeId, DepartmentId: departmentId }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function lookupEmployeeStatuses(options, pageSize) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/lookup/employee/status'), { Page: options.page, PageSize: pageSize, Term: options.term }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function save(current, original) {
        var deferred = $q.defer();
        $http.post(apiSvc.buildApiUrl('/api/management/employee/save'), { Current: current, Original: original }).then(
          function (response) { deferred.resolve(response.data); },
          function (response) { deferred.reject('error'); });
        return deferred.promise;
      }

      function setUser(user) {
        storage.save('user', user);
      }

      function getUser() {
      	var deferred = $q.defer();

        var user = storage.retrieve('user');
        if (!user || moment(user.Expires) <= moment()) {
          getClientUser().then(function (result) {
            user = result.Data;
            storage.save('user', user);
            deferred.resolve(user);
          }, function (result) {
            deferred.reject('Get Roles Failed: ' + result.statusText);
          });
        } else
          deferred.resolve(user);

        return deferred.promise;
      }

      function isAuthenticated() {
        return getUser().then(function () {
          return true;
        }, function (error) {
          return false;
        });
      }

      function hasRole(roles) {
      	if (roles) {
      		return getUser().then(function () {
      			return _.indexOf(user.Roles, role, true) >= 0 ? true : false;
      		}, function (error) {
      			return false;
      		});
      	}
      	return true;
      }

      function userHasRole(user, roles) {
      	if (roles) {
      		return getUser().then(function () {
      			return _.indexOf(user.Roles, role, true) >= 0 ? true : false;
      		}, function (error) {
      			return false;
      		});
      	}
      	return true;
      }
    }
  ]);

})(angular.module('account.services'));