(function (module) {
  module.config(['$stateProvider', '$urlRouterProvider', 'urlServiceProvider', function ($stateProvider, $urlRouterProvider, urls) {

    $stateProvider
      .state('app.home', {
        url: '/',
        views: {
          'main-content@app': {
            templateUrl: urls.templateUrlFor('app/views/home/home.tpl.html'),
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          security: {
            auth: true
            // role: 'admin' // If you do not specify a role, then you simply need to be authenticated
          },
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Home',
            description: 'Information on how to use this template.'
          }
        }
      })
	  .state('app.home.department', {
			url: 'department/{id}',
			views: {
				'main-content@app': {
					templateUrl: urls.templateUrlFor('app/views/home/home.tpl.html'),
					controller: 'HomeCtrl as home'
				}
			},
			data: {
				security: {
					auth: true
					// role: 'admin' // If you do not specify a role, then you simply need to be authenticated
				},
				pageInfo: {
					seo: {
						description: 'Bootstrap & Jquery UI components',
						keywords: 'Bootstrap,Jquery UI'
					},
					title: 'Home',
					description: 'Information on how to use this template.'
				}
			}
	  });
  }]);
})(angular.module('home.routes', ['ui.router']));