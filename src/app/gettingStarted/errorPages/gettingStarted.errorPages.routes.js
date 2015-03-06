(function (module) {
	module.config(['$stateProvider', '$urlRouterProvider', 'layoutServiceProvider', function ($stateProvider, $urlRouterProvider, layouts) {

    $stateProvider
	  .state('app.gettingStarted.error-pages', {
	  	url: '/special-pages',
	  	abstract: true,
	  	data: {
	  	  pageInfo: {
	  		title: 'Error Pages' // Strictly used here for breadcrumb even though this state is abstract
	  	  },
	  	  breadcrumb: {
	  		display: true
	  	  }
	  	}
	  })
	  .state('app.gettingStarted.error-pages.error', {
	    url: '/error',
	    views: {
	      'main-content@app.gettingStarted.error-pages': {
	        templateUrl: '/app/views/gettingStarted/specialPages/getting-started-special-pages-error.tpl.html',
	        controller: 'HomeCtrl as home'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Bootstrap & Jquery UI components',
	          keywords: 'Bootstrap,Jquery UI'
	        },
	        title: 'Error Pages',
	        description: 'Information on How to Use The Sidebar Navigation.'
	      }
	    }
	  })
	  .state('app.gettingStarted.error-pages.error-404', {
	    url: '/error',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/gettingStarted/specialPages/getting-started-special-pages-error-404.tpl.html',
	        controller: 'HomeCtrl as home'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Bootstrap & Jquery UI components',
	          keywords: 'Bootstrap,Jquery UI'
	        },
	        title: 'Error 404',
	        description: 'Information on How to Use The Sidebar Navigation.'
	      }
	    }
	  });
  }]);
})(angular.module('gettingStarted.errorPages.routes', ['ui.router']));