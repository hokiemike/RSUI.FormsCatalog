(function (module) {
  'use strict';

  module.controller('InterfaceVisualsCtrl', [
	  '$scope', '$modal', function ($scope, $modal) {
	    var vm = this;
	    vm.message = "Hello from Controller";
	    vm.shippingInfo = {
	      firstName: 'Test',
	      lastName: "User",
	      address1: '123 Any Street',
	      address2: 'Suite 100',
	      city: 'Atlanta',
	      state: 'Georgia',
	      postalCode: '33333',
	      email: "test@test.com",
	      phone: '(123) 123-1234'
	    };

	    // Pre-fetch an external template populated with a custom scope
	    var iconifiedModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: 'app/views/interface/visuals/modals/iconified.tpl.html', show: false });
	    var formModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: 'app/views/interface/visuals/modals/form.tpl.html', show: false });
	    var tableModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: 'app/views/interface/visuals/modals/table.tpl.html', show: false });
	    var remoteModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: 'app/views/interface/visuals/modals/remote.tpl.html', show: false });
	    var tabsModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: 'app/views/interface/visuals/modals/tabs.tpl.html', show: false });
	    var editorModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: 'app/views/interface/visuals/modals/wysiwyg.tpl.html', show: false });
	    var largeModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: 'app/views/interface/visuals/modals/large.tpl.html', show: false });
	    var smallModal = $modal({ scope: $scope, animation: "am-fade-and-scale", template: 'app/views/interface/visuals/modals/small.tpl.html', show: false });

	    vm.showModal = function (which) {
	      switch (which) {
	        case 'iconified':
	          iconifiedModal.$promise.then(iconifiedModal.show);
	          break;
	        case 'form':
	          formModal.$promise.then(formModal.show);
	          break;
	        case 'table':
	          tableModal.$promise.then(tableModal.show);
	          break;
	        case 'remote':
	          remoteModal.$promise.then(remoteModal.show);
	          break;
	        case 'tabs':
	          tabsModal.$promise.then(tabsModal.show);
	          break;
	        case 'editor':
	          editorModal.$promise.then(editorModal.show);
	          break;
	        case 'large':
	          largeModal.$promise.then(largeModal.show);
	          break;
	        case 'small':
	          smallModal.$promise.then(smallModal.show);
	          break;
	      }
	    };

	    vm.closeModal = function (which, data) {
	      switch (which) {
	        case 'iconified':
	          iconifiedModal.hide();
	          if (data) console.log(JSON.stringify(data));
	          break;
	        case 'form':
	          formModal.hide();
	          if (data) console.log(JSON.stringify(data));
	          break;
	        case 'table':
	          tableModal.hide();
	          if (data) console.log(JSON.stringify(data));
	          break;
	        case 'remote':
	          remoteModal.hide();
	          if (data) console.log(JSON.stringify(data));
	          break;
	        case 'tabs':
	          tabsModal.hide();
	          if (data) console.log(JSON.stringify(data));
	          break;
	        case 'editor':
	          editorModal.hide();
	          if (data) console.log(JSON.stringify(data));
	          break;
	        case 'large':
	          largeModal.hide();
	          if (data) console.log(JSON.stringify(data));
	          break;
	        case 'small':
	          smallModal.hide();
	          if (data) console.log(JSON.stringify(data));
	          break;
	      }
	    }
	  }
  ]);
})(angular.module('interface.controllers'));