(function (module) {
	module.config(['$stateProvider', '$urlRouterProvider', 'layoutServiceProvider', function ($stateProvider, $urlRouterProvider, layouts) {

    $stateProvider
      .state('app.gettingStarted', {
        url: '/getting-started',
        abstract: true,
        data: {
          security: {
            auth: false
          },
          pageInfo: {
            title: 'Getting Started' // Strictly used here for breadcrumb even though this state is abstract
          },
          breadcrumb: {
            display: true
          }
        }
      })
      .state('app.gettingStarted.app-conventions', {
        url: '/app-conventions',
        views: {
          'main-content@app': {
            templateUrl: '/app/views/gettingStarted/app-conventions.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'App Conventions',
            description: 'Information on Conventions Found Within This Template.'
          }
        }
      })
      .state('app.gettingStarted.ui-router', {
        url: '/ui-router',
        views: {
          'main-content@app': {
            templateUrl: '/app/views/gettingStarted/ui-router.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Angular UI-Router',
            description: 'Information on Angular UI-Router and how UI-Router is Integrated in This Them.'
          }
        }
      })
      .state('app.gettingStarted.directives', {
        url: '/directives',
        views: {
          'main-content@app': {
            templateUrl: '/app/views/gettingStarted/directives.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Angular Directives',
            description: 'Information on the Included Directives in This Template.'
          }
        }
      })
	  .state('app.gettingStarted.special-pages', {
	    url: '/special-pages',
	    abstract: true,
	    data: {
	      pageInfo: {
	        title: 'Special Pages' // Strictly used here for breadcrumb even though this state is abstract
	      },
	      breadcrumb: {
	        display: true
	      }
	    }
	  })
	  .state('app.gettingStarted.special-pages.error', {
	    url: '/error',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/gettingStarted/specialPages/error.tpl.html',
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
	  .state('app.gettingStarted.special-pages.error-404', {
	    url: '/error',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/gettingStarted/specialPages/error-404.tpl.html',
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
	  })
	  .state('app.gettingStarted.sidebar-navigation', {
	    url: '/sidebar-navigation',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/gettingStarted/sidebar-navigation.tpl.html',
	        controller: 'HomeCtrl as home'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Bootstrap & Jquery UI components',
	          keywords: 'Bootstrap,Jquery UI'
	        },
	        title: 'Sidebar Navigation',
	        description: 'Information on How to Use The Sidebar Navigation.'
	      }
	    }
	  })
	  .state('app.gettingStarted.top-navigation', {
	    url: '/top-navigation',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/gettingStarted/top-navigation.tpl.html',
	        controller: 'HomeCtrl as home'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Bootstrap & Jquery UI components',
	          keywords: 'Bootstrap,Jquery UI'
	        },
	        title: 'Top Navigation',
	        description: 'Information on How to Use The Top Navigation.'
	      }
	    }
	  }).state('app.gettingStarted.css-and-less', {
	    url: '/css-and-less',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/gettingStarted/css-and-less.tpl.html',
	        controller: 'HomeCtrl as home'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Bootstrap & Jquery UI components',
	          keywords: 'Bootstrap,Jquery UI'
	        },
	        title: 'CSS and Less',
	        description: 'Information on CSS and LESS used Within This Template.'
	      }
	    }
	  })
	  .state('app.gettingStarted.theme-components', {
	    url: '/theme-components',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/gettingStarted/theme-components.tpl.html',
	        controller: 'HomeCtrl as home'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Bootstrap & Jquery UI components',
	          keywords: 'Bootstrap,Jquery UI'
	        },
	        title: 'Theme Componenents',
	        description: 'Information on Theme Components this Template is Based.'
	      }
	    }
	  });
  }]);
})(angular.module('gettingStarted.routes', ['ui.router']));