(function (module) {

	module.factory('CatalogService', ['$http', '$q', 'UrlService', 'AmplifyService', function ($http, $q, urlService, storage) {
		function allForms(id) {
			var deferred = $q.defer();

			var forms = storage.retrieve('forms-' + id);
			if (!forms || moment(forms.Expires) <= moment()) {
				$http.get(urlService.apiUrlFor({ controller: 'catalogs', subpath: ['all', 'forms'], id: id })).then(
		  function (response) {
		  	storage.save('forms-' + id, response.data);
		  	deferred.resolve(response.data);
		  },
		  function (rejection) { deferred.reject(rejection.statusText); });
			} else deferred.resolve(forms);

			return deferred.promise;
		}

		function findForms(input) {
			var deferred = $q.defer();

			$http.post(urlService.apiUrlFor({ controller: 'catalogs', subpath: ['find', 'forms'] }), input).then(
		    function (response) { deferred.resolve(response.data); },
		    function (rejection) { deferred.reject(rejection.statusText); });

			return deferred.promise;
		}

		function findGroupForms(input) {
			var deferred = $q.defer();

			$http.post(urlService.apiUrlFor({ controller: 'catalogs', subpath: ['find', 'group', 'forms'] }), input).then(
		    function (response) { deferred.resolve(response.data); },
		    function (rejection) { deferred.reject(rejection.statusText); });

			return deferred.promise;
		}

		function lookupForms(options, pageSize, filters) {
			var deferred = $q.defer();
			$http.post(urlService.apiUrlFor({ controller: 'catalogs', subpath: ['lookup', 'department', 'forms'] }), { Page: options.page, PageSize: pageSize, Term: options.term, DepartmentId: filters.DepartmentId, DocTypes: filters.DocTypes, SubTypes: filters.SubTypes }).then(
        function (response) { deferred.resolve(response.data); },
        function (response) { deferred.reject(response); });
			return deferred.promise;
		}


		function getDocTypes(id) {
			var deferred = $q.defer();

			$http.get(urlService.apiUrlFor({ controller: 'catalogs', subpath: ['department', 'doctypes'], id: id })).then(
				function (response) {
					deferred.resolve(response.data.DocTypes);
				},
				function (rejection) { deferred.reject(rejection.statusText); });

			return deferred.promise;
		}

		function getDepartmentFilters(id) {
			var deferred = $q.defer();

				$http.get(urlService.apiUrlFor({ controller: 'catalogs', subpath: ['department', 'filters'], id: id })).then(
		  function (response) {
		  	deferred.resolve(response.data);
		  },
		  function (rejection) { deferred.reject(rejection.statusText); });

			return deferred.promise;
		}

		function saveCollection(collection, departmentId) {
			var uc = getCollections(departmentId);
			uc.push(collection);
			storage.save('user-collections-' + departmentId, uc);
		}

		function getCollections(departmentId) {
			var uc = storage.retrieve('user-collections-' + departmentId);
			if (!uc) uc = [];
			return uc;
		}

		function getZipDownload(selectedForms) {
			var deferred = $q.defer();
			$http.post(urlService.apiUrlFor({ controller: 'catalogs', subpath: ['get', 'zip', 'file'] }), { SelectedForms: selectedForms }).then(
        function (response) { deferred.resolve(response.data); },
        function (response) { deferred.reject(response); });
			return deferred.promise;
		}

		function sendEmail(emailInfo, selectedForms) {
			var deferred = $q.defer();
			$http.post(urlService.apiUrlFor({ controller: 'catalogs', subpath: ['email', 'docs'] }), angular.extend(emailInfo, { Forms: selectedForms })).then(
        function (response) { deferred.resolve(response.data); },
        function (response) { deferred.reject(response); });
			return deferred.promise;
		}

		return {
			allForms: allForms,
			findForms: findForms,
			findGroupForms: findGroupForms,
			getDocTypes: getDocTypes,
			lookupForms: lookupForms,
			getDepartmentFilters: getDepartmentFilters,
			saveCollection: saveCollection,
			getCollections: getCollections,
			getZipDownload: getZipDownload,
			sendEmail: sendEmail
		};

	}]);
})(angular.module('home.services'));