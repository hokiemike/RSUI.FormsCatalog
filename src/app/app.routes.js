angular.module('app.routes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', 'layoutServiceProvider', 'urlServiceProvider', function ($stateProvider, $urlRouterProvider, layoutService, urls) {
  	$urlRouterProvider.otherwise('/');

  	var preset = layoutService.presets.navbarFixed;

  	$stateProvider
			.state('app', {
				'abstract': true,
				views: {
					'container@': preset.views.container,
					'navbar@app': preset.views.navbar, // angular.extend(preset.views.navbar, { templateUrl: '/app/views/layout/navbars/navbar-filters.tpl.html' }),
					//'sidebar@app': angular.extend(preset.views.sidebar, { templateUrl: '/app/views/layout/sidebars/filters.tpl.html' }),
					'footer@app': preset.views.footer
				},
				data: {
					classes: preset.classes,
					security: {
						auth: false
					},
					pageInfo: {
						title: 'App'
					},
					breadcrumb: {
						proxy: 'app.home'
					}
				},
				resolve: {
					user: ['$q', 'AccountService', function ($q, acctSvc) {
						var deferred = $q.defer();
						acctSvc.getUser().then(function (user) {
							deferred.resolve(user);
						},
              function (rejection) {
              	deferred.reject(rejection);
              });
						return deferred.promise;
					}]
				}
			})
			.state('error', {
				url: '/error',
				'abstract': true,
				views: {
					'container@': layoutService.presets.error.views.container
				},
				data: {
					classes: layoutService.presets.error.classes
				}
			})
			.state('error.500', {
				url: '/critical-error',
				views: {
					'error-content@error': {
						templateUrl: urls.templateUrlFor('app/views/app/app.500.tpl.html')
					}
				},
				data: {
					pageInfo: {
						title: 'Server Error',
						description: 'We were unable to locate the resource you were requesting'
					}
				}
			})
			.state('error.404', {
				url: '/page-not-found',
				views: {
					'error-content@error': {
						templateUrl: urls.templateUrlFor('app/views/app/app.404.tpl.html')
					}
				},
				data: {
					pageInfo: {
						title: 'Page Not Found',
						description: 'We were unable to locate the resource you were requesting'
					}
				}
			})
			.state('error.401', {
				url: '/not-authorized',
				views: {
					'error-content@error': {
						templateUrl: urls.templateUrlFor('app/views/app/app.401.tpl.html')
					}
				},
				data: {
					pageInfo: {
						title: 'Not Authorized',
						description: 'We were unable to authorize your request'
					}
				}
			});
  }]);