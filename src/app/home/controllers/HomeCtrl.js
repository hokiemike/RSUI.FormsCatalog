(function (module) {

	module.controller('HomeCtrl', [
	'$rootScope', '$scope', '$filter', '$modal', '$state', '$timeout', '$compile', 'Logger', 'CatalogService', 'AmplifyService', 'Select2Options', 'ZipDownloadService', 'urlService', 'user', '$http',
  function ($rootScope, $scope, $filter, $modal, $state, $timeout, $compile, logger, catalogSvc, storage, select2Options, zipDownloadService, urls, user, $http) {
  	var vm = this;
  	vm.form = [];
  	vm.groups = [];
  	vm.docTypes = [];
  	vm.subTypes = [];
  	vm.selectedForms = [];
  	vm.savedCollections = [];
  	vm.documentTypesOpen = true;
  	vm.subTypesOpen = false;
  	vm.filter = false;
  	vm.departmentId = $rootScope.departmentId;
  	vm.zipRequested = false;
  	vm.zipFiles = [];
  	vm.admitted = 'All';
  	vm.inactiveButtonTitle = 'Include Inactive';
  	vm.saveCollectionModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: urls.templateUrlFor('app/views/home/save-collection-modal.tpl.html'), show: false });
  	vm.formCommentModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: urls.templateUrlFor('app/views/home/form-comment-modal.tpl.html'), show: false });
  	vm.emailModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: urls.templateUrlFor('app/views/home/send-email-modal.tpl.html'), show: false });
  	vm.accordions = {
  		whatsNew: {
  			open: true
  		}
  	}

  	vm.toggleInactive = function () {
  		vm.includeInactive = !vm.includeInactive;
  		vm.inactiveButtonTitle = vm.includeInactive ? 'Hide Inactive' : 'Include Inactive';
  		$scope.$emit('formTable.redraw');
  		$scope.$emit('show.tab', '#formsContentTab');
  	}

  	vm.showCommentModal = function (formDocId, grid) {
  		var doc;
  		if (grid.toLowerCase() == 'whatsnew')
  			doc = _.where(vm.whatsNew, { 'DocID': formDocId })[0];
  		else
  			doc = _.where(vm.forms, { 'DocID': formDocId })[0];

  		vm.formCommentEdit = {
  			Name: doc.Name,
  			DocID: formDocId,
  			Comment: doc.Comment,
  			grid: grid
  		};
  		vm.formCommentModal.$promise.then(vm.formCommentModal.show);
  	}

  	vm.showEmailModal = function () {
  		vm.emailInfo = {};
  		vm.emailModal.$promise.then(vm.emailModal.show);
  	}

  	vm.formSearchOptions = angular.extend({
  		query: function (options) {
  			var docTypes = [];
  			vm.docTypes.forEach(function (group) {
  				var selected = _.pluck(_.where(group.rowData, { 'Selected': true }), 'DocType');
  				docTypes = _.union(docTypes, selected);
  			});
  			var subTypes = [];
  			vm.subTypes.forEach(function (group) {
  				var selected = _.pluck(_.where(group.rowData, { 'Selected': true }), 'Id');
  				subTypes = _.union(subTypes, selected);
  			});
  			catalogSvc.lookupForms(options, 50, { DepartmentId: vm.departmentId, DocTypes: docTypes, SubTypes: subTypes }).then(
		  function (result) {
		  	var filtered = {
		  		more: result.Data.more,
		  		results: _.remove(result.Data.results, function (form) {
		  			return _.findIndex(vm.selectedForms, { DocNumber: form.DocNumber }) >= 0 ? false : true;
		  		})
		  	}
		  	options.callback(filtered);
		  	vm.searchForms = filtered;
		  },
		  function (rejection) { logger.log('Failed to Find Forms: ' + rejection, Logger.WarningSettings); });
  		},
  		id: function (form) { return form.DocID; },
  		dropdownCssClass: "bigdrop",
  		escapeMarkup: function (m) { return m; }, // we do not want to escape markup since we are displaying html in results
  		formatResult: function (form) {
  			var markup = '<div class="form-list-item">';
  			markup += '<div class="pull-left"><i class="icon-file-pdf pdf-form-item"></i></div>';
  			markup += '<div class="form-item-data">';
  			markup += '<span class="form-name form-item">' + $filter('cut')(form.Name, true, 100) + '</span><br />';
  			markup += 'Doc #: <span class="form-subitem form-item">' + form.DocNumber + '</span>  Effective Date: <span class="form-subitem form-item">' + $filter('date')(form.EffectiveDate, 'shortDate') + '</span>';
  			markup += '</div></div>';
  			return markup;
  		},
  		formatSelection: function (form) {
  			return form.Name;
  		}
  	}, select2Options.baseSelect2InitOptions);

  	vm.savedCollectionOptions = {
  		allowClear: true
  	};
  	$scope.$watch(function () { return vm.selectedSavedCollection; }, function (newValue, oldValue) {
  		if (!angular.equals(newValue, oldValue)) {
  			if (newValue) {
  				var arr = _.where(vm.savedCollections, { name: newValue });
  				if (arr.length)
  					vm.selectedForms = angular.copy(_.where(vm.savedCollections, { name: newValue })[0].forms);
  				else
  					vm.selectedForms = [];
  			}
  		}
  	});

  	vm.removeItem = function (form) {
  		for (var i = 0, l = vm.selectedForms.length; i < l; i++) {
  			if (vm.selectedForms[i].DocID === form.DocID) {
  				var index = _.findIndex(vm.whatsNew, { DocID: form.DocID });
  				if (index >= 0) vm.whatsNew[index].selected = false;
  				vm.selectedForms.splice(i, 1);
  				vm.selectedSavedCollection = null;
  				vm.zipFiles = [];
  				vm.downloadFailed = null;
  				vm.emailSentError = null;
  				return;
  			}
  		}
  	}
  	vm.add = function () {
  		if (vm.searchTerm) {
  			if (_.some(vm.selectedForms, { DocID: vm.searchTerm.DocID })) {
  				logger.log('Form: ' + vm.searchTerm.Name + ' has already been added.');
  			} else {
  				var doc = angular.copy(vm.searchTerm);
  				doc.selected = true;
  				vm.selectedForms.push(doc);
  				vm.searchTerm = null;
  			}
  		} else {
  			logger.log('Please select a Form.');
  		}
  	}
  	vm.toggleForm = function (formDocId, grid) {
  		var doc;
  		if (grid.toLowerCase() == 'whatsnew')
  			doc = _.where(vm.whatsNew, { 'DocID': formDocId })[0];
  		else
  			doc = _.where(vm.forms, { 'DocID': formDocId })[0];


  		if (_.some(vm.selectedForms, { DocID: formDocId })) {
  			doc.selected = false;
  			vm.selectedForms.splice(_.findIndex(vm.selectedForms, { 'DocID': formDocId }), 1);// logger.log('Form: ' + doc.Name + ' has already been added.');
  		} else {
  			doc.selected = true;
  			vm.selectedForms.push(doc);
  		}
  		vm.selectedSavedCollection = null;
  		vm.hoveredItem = null;
  		vm.zipFiles = [];
  	}
  	vm.toggleFilterPin = function () {
  		$scope.$broadcast('toggle.filters.pin');
  	}
  	vm.isSelected = function (formDocId) {
  		return _.some(vm.selectedForms, { DocID: formDocId }) ? 'btn-success btn-form-remove' : 'btn-primary btn-form-add';
  	}
  	vm.hasComments = function (formDocId, grid) {
  		var doc;
  		if (grid.toLowerCase() == 'whatsnew') {
  			doc = _.where(vm.whatsNew, { DocID: formDocId })[0];
  			return doc ? doc.Comment ? 'form-has-comments btn-success' : 'btn-comments disabled' : 'btn-comments disabled';
  		} else {
  			doc = _.where(vm.forms, { DocID: formDocId })[0];
  			return doc ? doc.Comment ? 'form-has-comments btn-success' : 'btn-comments disabled' : 'btn-comments disabled';
  		}
  	}
  	vm.admittedFilter = function (data) {
  		vm.admitted = data;
  		vm.refreshTable(true);
  	}
  	vm.saveCollection = function (name, personal) {
  		vm.saveCollectionModal.$promise.then(vm.saveCollectionModal.show);
  	}
  	vm.clearSelectedForms = function () {
  		vm.selectedForms = [];
  		vm.selectedSavedCollection = null;
  		vm.zipFiles = [];
  		vm.downloadFailed = null;
  		vm.emailSentError = null;
  	}
  	vm.closeModal = function (which, data) {
  		switch (which) {
  			case 'collection':
  				if (data) {
  					var copy = angular.copy(vm.newDocumentCollection);
  					var collection = {
  						name: copy.name,
  						personal: copy.personalUse,
  						department: angular.copy(vm.departmentId),
  						forms: angular.copy(vm.selectedForms)
  					}
  					catalogSvc.saveCollection(collection, vm.departmentId);
  					vm.savedCollections.push(collection);
  				}
  				vm.newDocumentCollection = {};
  				vm.saveCollectionModal.hide();
  				break;

  			case 'comments':
  				if (data) {
  					var index;
  					if (data.grid.toLowerCase() == 'whatsnew') {
  						index = _.findIndex(vm.whatsNew, { DocID: data.DocID });
  						if (index >= 0) {
  							vm.whatsNew[index].Comment = data.Comment;
  						}
  					} else {
  						index = _.findIndex(vm.forms, { DocID: data.DocID });
  						if (index >= 0) {
  							vm.forms[index].Comment = data.Comment;
  						}
  					}
  				}
  				vm.formCommentEdit = {};
  				vm.formCommentModal.hide();
  				break;

  			case 'email':
  				if (data) {
  					catalogSvc.sendEmail(vm.emailInfo, vm.selectedForms).then(function (result) {
  						logger.log("Email is currenly sending.", Logger.InfoSettings);
  					}, function (rejection) {
  						logger.log("Email failed to be sent", Logger.ErrorSettings);
  					});
  				}
  				vm.emailInfo = {};
  				vm.emailModal.hide();

  				break;
  		}
  	}

    vm.getFormDocDownloadUrl = function(id) {
      var url = urls.apiUrlFor({ controller: 'Catalogs', subpath: ["download", 'doc', id + '-' + Math.floor((Math.random() * 10000) + 1) + '-0'] });
      return url;
    }

  	vm.getForm = function (id, isNative) {
  		isNative = isNative ? isNative : false;
  		window.open(urls.apiUrlFor({ controller: 'Catalogs', subpath: ["download", 'doc', id + '-' + Math.floor((Math.random() * 10000) + 1) + (isNative ? '-1' : '-0')] }), '_blank', '');
  	}

  	vm.whatsNewTableOptions = {
  		bRetrieve: true,
  		iDisplayLength: 20,
  		sAjaxSource: urls.apiUrlFor({ controller: 'catalogs', subpath: ['whats', 'new', 'table'] }),
  		bServerSide: true,
  		fnServerData: function (sSource, aoData, fnCallback) {
  			if (!vm.docTypes || vm.docTypes.length == 0 || !vm.subTypes || vm.subTypes.length == 0) {
  				fnCallback({
  					aaData: [],
  					iTotalRecords: 0,
  					iTotalDisplayRecords: 0
  				});
  			} else {
  				$rootScope.$broadcast("ajax-start");

  				var docTypes = [];
  				vm.docTypes.forEach(function (group) {
  					var selected = _.pluck(_.where(group.rowData, { 'Selected': true }), 'DocType');
  					docTypes = _.union(docTypes, selected);
  				});
  				var subTypes = [];
  				vm.subTypes.forEach(function (group) {
  					var selected = _.pluck(_.where(group.rowData, { 'Selected': true }), 'Id');
  					subTypes = _.union(subTypes, selected);
  				});

  				RsuiUtils.DataTables.PostConvertedAoData(sSource, angular.extend(RsuiUtils.DataTables.ConvertAoData(aoData), { DepartmentId: vm.departmentId, DocTypes: docTypes, SubTypes: subTypes }), null, function (result) {
  					vm.whatsNew = result.Data;
  					$rootScope.$broadcast("ajax-stop");
  					fnCallback({
  						aaData: result.Data,
  						iTotalRecords: result.TotalRecords,
  						iTotalDisplayRecords: result.DisplayedRecords
  					});
  				});
  			}
  		},
  		fnCreatedRow: function (nRow, aData, iDataIndex) {
  			$(nRow).attr('id', aData.DocID);
  			if (aData.IsInactive) $(nRow).addClass("inactive-form");
  			var linker = $compile(nRow);
  			var element = linker($scope);
  			return nRow = element;
  		},
  		aoColumnDefs: [
        {
        	mData: null,
        	bSortable: false,
        	sWidth: "50px",
        	bUseRendered: false,
        	mRender: function (o, type, row) {
        		var result = '<div class="form-actions"><button class="btn btn-xs btn-xxs" ng-class="home.hasComments(' + row.DocID + ',\'whatsnew\')" ng-click="home.showCommentModal(' + row.DocID + ',\'whatsnew\')"></button>';
        		result += '<button class="btn btn-xs btn-xxs" ng-class="home.isSelected(' + row.DocID + ')" ng-click="home.toggleForm(' + row.DocID + ',\'whatsnew\')"></button></div>';
        		return result;
        	},
        	aTargets: [0]
        },
        {
        	mData: 'Name',
        	aTargets: [1],
        	bUseRendered: false,
        	mRender: function (o, type, row) {
        	  var result = '<a  href="' + vm.getFormDocDownloadUrl(row.DocID) + '" target="_blank" class="form-doc-file-url">' + row.Name.trim() + '</a>' + ' <strong>' + ((row.DocNumber == null || row.DocNumber == '') ? 'N/A' : row.DocNumber) + '</strong> - <strong>' + ((row.Edition == null || row.Edition == '') ? 'N/A' : row.Edition) + '</strong> - ' + (row.EffectiveDate ? $filter('date')(row.EffectiveDate, 'shortDate') : row.EffectiveDate);
        		if (row.IsInactive) result += ' Inactive';
        		return result;
        	},
        },
        {
        	mData: 'DocType',
        	aTargets: [2]
        },
			  {
			  	mData: 'SubTypes',
			  	aTargets: [3],
			  	bUseRendered: false,
			  	bSortable: false,
			  	mRender: function (o, type, row) {

			  		var data = '';
			  		if (row.SubTypes && row.SubTypes.length > 0) {
			  			if (row.SubTypes.length <= 3)
			  				data = _.chain(row.SubTypes).sortBy('Description').map(function (subtype) { return subtype.Description; }).value().join(' | ');
			  			else
			  				data += '&nbsp; <span class="more-subtypes" popover-placement="left" popover-trigger="mouseenter" popover="' + _.chain(row.SubTypes).sortBy('Description').map(function (subtype) { return subtype.Description; }).value().join('\r\n') + '"><i class="icon-stack"></i> Many</span>';
			  		}
			  		return data;
			  	}
			  }
  		],
  		bSort: false,
  		bAutoWidth: false,
  		bJQueryUI: false,
  		pagingType: 'full_numbers',
  		language: {
  			infoEmpty: 'No Matching Documents Found',
  			emptyTable: 'No Matching Documents Found'
  		},
  		dom: '<"datatable-scroll"t><"datatable-footer"i>'
  	}
  	vm.formTableOptions = {
  		bRetrieve: true,
  		iDisplayLength: 20,
  		sAjaxSource: urls.apiUrlFor({ controller: 'catalogs', subpath: ['find', 'forms', 'table'] }),
  		bServerSide: true,
  		fnServerData: function (sSource, aoData, fnCallback) {
  			if (!vm.docTypes || vm.docTypes.length == 0 || !vm.subTypes || vm.subTypes.length == 0) {
  				fnCallback({
  					aaData: [],
  					iTotalRecords: 0,
  					iTotalDisplayRecords: 0
  				});
  			} else {
  				$rootScope.$broadcast("ajax-start");
  				var docTypes = [];
  				vm.docTypes.forEach(function (group) {
  					var selected = _.pluck(_.where(group.rowData, { 'Selected': true }), 'DocType');
  					docTypes = _.union(docTypes, selected);
  				});
  				var subTypes = [];
  				vm.subTypes.forEach(function (group) {
  					var selected = _.pluck(_.where(group.rowData, { 'Selected': true }), 'Id');
  					subTypes = _.union(subTypes, selected);
  				});

  				RsuiUtils.DataTables.PostConvertedAoData(sSource, angular.extend(RsuiUtils.DataTables.ConvertAoData(aoData), { GlobalSearchText: vm.searchTerm, DepartmentId: vm.departmentId, DocTypes: docTypes, SubTypes: subTypes, Admitted: vm.admitted, IncludeInactive: vm.includeInactive }), null, function (result) {
  					vm.forms = result.Data;
  					$rootScope.$broadcast("ajax-stop");
  					fnCallback({
  						aaData: result.Data,
  						iTotalRecords: result.TotalRecords,
  						iTotalDisplayRecords: result.DisplayedRecords
  					});
  				});
  			}
  		},
  		fnCreatedRow: function (nRow, aData, iDataIndex) {
  			$(nRow).attr('id', aData.DocID);
  			aData.IsInactive ? $(nRow).addClass("inactive-form") : $(nRow).addClass("active-form");
  			var linker = $compile(nRow);
  			var element = linker($scope);
  			return nRow = element;
  		},
  		aoColumnDefs: [
        {
        	mData: null,
        	bSortable: false,
        	sWidth: "50px",
        	//sClass: "text-align-center",
        	bUseRendered: false,
        	mRender: function (o, type, row) {
        		var result = '<div class="form-actions"><button class="btn btn-xs btn-xxs" ng-class="home.hasComments(' + row.DocID + ',\'forms\')" ng-click="home.showCommentModal(' + row.DocID + ',\'forms\')"></button>';
        		result += '<button class="btn btn-xs btn-xxs" ng-class="home.isSelected(' + row.DocID + ')" ng-click="home.toggleForm(' + row.DocID + ',\'forms\')"></button></div>';
        		return result;
        	},
        	aTargets: [0]
        },
        {
        	mData: 'Name',
        	aTargets: [1],
        	bUseRendered: false,
        	mRender: function (o, type, row) {
        	  var result = '<a href="' + vm.getFormDocDownloadUrl(row.DocID) + '" target="_blank" class="form-doc-file-url">' + row.Name.trim() + '</a>';
        		if (user.CanAccessNativeForms)
        			result += '<span class="btn btn-xs btn-xxs btn-default ml5" ng-click="home.getForm(' + row.DocID + ', true)">Word</span> ';
        		result += ' <strong>' + ((row.DocNumber == null || row.DocNumber == '') ? 'N/A' : row.DocNumber) + '</strong> - <strong>' + ((row.Edition == null || row.Edition == '') ? 'N/A' : row.Edition) + '</strong> - ' + (row.EffectiveDate ? $filter('date')(row.EffectiveDate, 'shortDate') : row.EffectiveDate);
        		if (row.IsInactive) result += ' <span class="note">[Inactive]</span>';
        		return result;
        	},
        },
        {
        	mData: 'DocType',
        	aTargets: [2]
        },
  			{
  				mData: 'SubTypes',
  				aTargets: [3],
  				bUseRendered: false,
  				bSortable: false,
  				mRender: function (o, type, row) {
  					var data = '';
  					if (row.SubTypes && row.SubTypes.length > 0) {
  						if (row.SubTypes.length <= 3)
  							data = _.chain(row.SubTypes).sortBy('Description').map(function (subtype) { return subtype.Description; }).value().join(' | ');
  						else
  							data += '&nbsp; <span class="more-subtypes" popover-placement="left" popover-trigger="mouseenter" popover="' + _.chain(row.SubTypes).sortBy('Description').map(function (subtype) { return subtype.Description; }).value().join('\r\n') + '"><i class="icon-stack"></i> Many</span>';
  					}
  					return data;
  				}
  			}
  		],
  		bSort: true,
  		aaSorting: [[1, 'asc']],
  		bAutoWidth: false,
  		bJQueryUI: false,
  		pagingType: 'full_numbers',
  		language: {
  			infoEmpty: 'No Matching Documents Found',
  			emptyTable: 'No Matching Documents Found'
  		},
  		dom: '<"datatable-header"ip><"datatable-scroll"t><"datatable-footer"ip>'
  	}
  	vm.toggleComments = function (form) {
  		form.showingComments = !form.showingComments;
  	};
  	vm.toggleType = function () {
  		vm.docTypes.forEach(function (row) {
  			row.rowData.forEach(function (obj) {
  				obj.Selected = vm.checkbox.documentType ? true : false;
  			});
  		});
  		vm.refreshTable(true);
  	}
  	vm.typeToggled = function (type) {
  		vm.checkbox.documentType = filterToggled(type.Selected, vm.docTypes);
  	}
  	vm.toggleCategory = function () {
  		vm.subTypes.forEach(function (row) {
  			row.rowData.forEach(function (obj) {
  				obj.Selected = vm.checkbox.documentCategory ? true : false;
  			});
  		});
  		vm.refreshTable(true);
  	}
  	vm.categoryToggled = function (type) {
  		vm.checkbox.documentCategory = filterToggled(type.Selected, vm.subTypes);
  	}
  	function filterToggled(newState, rows) {
  		var checked = false;
  		if (newState) {
  			var rowPass = true;
  			rows.forEach(function (row) {
  				if (!rowPass) return false;
  				rowPass = _.every(row.rowData, { Selected: true });
  			});
  			checked = rowPass;
  		}
  		vm.refreshTable(true);
  		return checked;
  	}
  	vm.toggleFilter = function () {
  		$scope.$broadcast('toggle.filters');
  	}
  	vm.getZipDownload = function () {
  		vm.zipRequested = true;
  		catalogSvc.getZipDownload(vm.selectedForms).then(function (result) { }, function (rejection) { });
  	}
  	vm.toggleZipDetails = function (form) {
  		form.showDetails = form.showDetails ? !form.showDetails : true;
  	}
  	vm.urlForFormsService = function (id) {
  		return urls.urlForFormService(id);
  	}
  	vm.canEmailForms = function () {
  		return !user.ExternalUser;
  	}
  	function activate() {
  		vm.checkbox = { documentType: true, documentCategory: true };
  		if (vm.departmentId) {
  			catalogSvc.getDepartmentFilters(vm.departmentId).then(
				  function (result) {
				  	vm.docTypes = $filter('rowColumns')(result.DocTypes, 4, 'col-md-12 col-sm-12 col-xs-12');
				  	vm.subTypes = $filter('rowColumns')(result.SubTypes, 4, 'col-md-12 col-sm-12 col-xs-12');
				  	$scope.$emit('whatsNewTable.redraw');
				  	vm.refreshTable();
				  },
				  function (rejection) { logger.log('Failed to Get Department Filters: ' + rejection, Logger.WarningSettings); });
  			vm.savedCollections = catalogSvc.getCollections(vm.departmentId);
  		}
  	}
  	activate();
  	zipDownloadService.initializeClient();
  	vm.refreshTable = function (showTab) {
  		$scope.$emit('formTable.redraw');
  		if (showTab)
  			$scope.$emit('show.tab', '#formsContentTab');
  	}
  	var timer = false;
  	$scope.$watch(function () { return vm.searchTerm; }, function (newValue, oldValue) {
  		if (timer) {
  			$timeout.cancel(timer);
  		}
  		timer = $timeout(function () {
  			if (!angular.equals(newValue, oldValue)) {
  				vm.refreshTable(true);
  			}
  		}, 750);
  	});

  	$scope.$on('department.changed', function (evt, department) {
		  if (department) {
			  vm.departmentId = department.id;
			  vm.selectedForms = [];
			  activate();
		  }
	  });

  	$scope.$on('zipDownload.Ready', function (evt, result) {
  		logger.log('Zip Download Ready', Logger.SuccessSettings);
  		$scope.$apply(function () {
  			vm.zipRequested = false;
  			vm.zipFiles.push(result);
  		});
  	});

  	$scope.$on('zipDownload.Failed', function (evt, result) {
  		logger.log('Zip Download Failed', Logger.ErrorSettings);
  		$scope.$apply(function () {
  			vm.zipRequested = false;
  			vm.downloadFailed = result;
  		});
  	});
  	$scope.$on('email.Sent', function (evt, result) {
  		logger.log('Recipient: ' + result.To.Name, Logger.SuccessSettings, 'Email Sent: ' + result.Subject, null, true);
  		$scope.$apply(function () {
  			vm.emailSent = true;
  			vm.emailSentInfo = result;
  		});
  	});

  	$scope.$on('email.Failed', function (evt, result) {
  		logger.log('Recipient: ' + result.To.Name, Logger.ErrorSettings, 'Email Failed: ' + result.Error, null, true);
  		$scope.$apply(function () {
  			vm.emailSent = false;
  			vm.emailSentError = result;
  		});
  	});

  	//http://baservicesstage.rsui.com/fs/api/docid/12619

  }]);
})(angular.module('home.controllers'));