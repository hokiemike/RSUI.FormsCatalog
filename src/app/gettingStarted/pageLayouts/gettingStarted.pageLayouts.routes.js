(function (module) {
	module.config(['$stateProvider', '$urlRouterProvider', 'layoutServiceProvider', function ($stateProvider, $urlRouterProvider, layouts) {

    $stateProvider
      .state('app.gettingStarted.page-layouts', {
        url: '/page-layouts',
        abstract: true,
        data: {
          pageInfo: {
            title: 'Page Layouts' // Strictly used here for breadcrumb even though this state is abstract
          },
          breadcrumb: {
            display: true
          }
        }
      })
      .state('app.gettingStarted.page-layouts.navbar-sidebar', {
        url: '/navbar-sidebar',
        views: {
          'container@': layouts.presets.navbarSidebar.views.container,
          'navbar@app.gettingStarted.page-layouts.navbar-sidebar': layouts.presets.navbarSidebar.views.navbar,
          'sidebar@app.gettingStarted.page-layouts.navbar-sidebar': layouts.presets.navbarSidebar.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.navbar-sidebar': layouts.presets.navbarSidebar.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.navbar-sidebar': layouts.presets.navbarSidebar.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.navbar-sidebar': layouts.presets.navbarSidebar.views.footer,
          'main-content@app.gettingStarted.page-layouts.navbar-sidebar': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/navbar-sidebar.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.navbarSidebar.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Navbar and Sidebar',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.navbar-sidebar-right', {
        url: '/navbar-sidebar-right',
        views: {
          'container@': layouts.presets.navbarSidebarRight.views.container,
          'navbar@app.gettingStarted.page-layouts.navbar-sidebar-right': layouts.presets.navbarSidebarRight.views.navbar,
          'sidebar@app.gettingStarted.page-layouts.navbar-sidebar-right': layouts.presets.navbarSidebarRight.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.navbar-sidebar-right': layouts.presets.navbarSidebarRight.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.navbar-sidebar-right': layouts.presets.navbarSidebarRight.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.navbar-sidebar-right': layouts.presets.navbarSidebarRight.views.footer,
          'main-content@app.gettingStarted.page-layouts.navbar-sidebar-right': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/navbar-sidebar-right.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.navbarSidebarRight.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Navbar and Sidebar Right',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.navbar-fixed-sidebar', {
        url: '/navbar-fixed-sidebar',
        views: {
          'container@': layouts.presets.navbarFixedSidebar.views.container,
          'navbar@app.gettingStarted.page-layouts.navbar-fixed-sidebar': layouts.presets.navbarFixedSidebar.views.navbar,
          'sidebar@app.gettingStarted.page-layouts.navbar-fixed-sidebar': layouts.presets.navbarFixedSidebar.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.navbar-fixed-sidebar': layouts.presets.navbarFixedSidebar.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.navbar-fixed-sidebar': layouts.presets.navbarFixedSidebar.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.navbar-fixed-sidebar': layouts.presets.navbarFixedSidebar.views.footer,
          'main-content@app.gettingStarted.page-layouts.navbar-fixed-sidebar': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/navbar-fixed-sidebar.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.navbarFixedSidebar.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Navbar Fixed and Sidebar',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.navbar-fixed-sidebar-fixed', {
        url: '/navbar-fixed-sidebar-fixed',
        views: {
          'container@': layouts.presets.navbarFixedSidebarFixed.views.container,
          'navbar@app.gettingStarted.page-layouts.navbar-fixed-sidebar-fixed': layouts.presets.navbarFixedSidebarFixed.views.navbar,
          'sidebar@app.gettingStarted.page-layouts.navbar-fixed-sidebar-fixed': layouts.presets.navbarFixedSidebarFixed.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.navbar-fixed-sidebar-fixed': layouts.presets.navbarFixedSidebarFixed.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.navbar-fixed-sidebar-fixed': layouts.presets.navbarFixedSidebarFixed.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.navbar-fixed-sidebar-fixed': layouts.presets.navbarFixedSidebarFixed.views.footer,
          'main-content@app.gettingStarted.page-layouts.navbar-fixed-sidebar-fixed': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/navbar-fixed-sidebar-fixed.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.navbarFixedSidebarFixed.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Navbar Fixed and Sidebar Fixed',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.navbar-fixed-sidebar-right', {
        url: '/navbar-fixed-sidebar-right',
        views: {
          'container@': layouts.presets.navbarFixedSidebarRight.views.container,
          'navbar@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right': layouts.presets.navbarFixedSidebarRight.views.navbar,
          'sidebar@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right': layouts.presets.navbarFixedSidebarRight.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right': layouts.presets.navbarFixedSidebarRight.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right': layouts.presets.navbarFixedSidebarRight.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right': layouts.presets.navbarFixedSidebarRight.views.footer,
          'main-content@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/navbar-fixed-sidebar-right.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.navbarFixedSidebarRight.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Navbar Fixed and Sidebar Right',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.navbar-fixed-sidebar-right-fixed', {
        url: '/navbar-fixed-sidebar-right-fixed',
        views: {
          'container@': layouts.presets.navbarFixedSidebarRightFixed.views.container,
          'navbar@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right-fixed': layouts.presets.navbarFixedSidebarRightFixed.views.navbar,
          'sidebar@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right-fixed': layouts.presets.navbarFixedSidebarRightFixed.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right-fixed': layouts.presets.navbarFixedSidebarRightFixed.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right-fixed': layouts.presets.navbarFixedSidebarRightFixed.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right-fixed': layouts.presets.navbarFixedSidebarRightFixed.views.footer,
          'main-content@app.gettingStarted.page-layouts.navbar-fixed-sidebar-right-fixed': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/navbar-fixed-sidebar-right-fixed.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.navbarFixedSidebarRightFixed.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Navbar Fixed and Sidebar Right Fixed',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.navbar', {
        url: '/navbar',
        views: {
          'container@': layouts.presets.navbar.views.container,
          'navbar@app.gettingStarted.page-layouts.navbar': layouts.presets.navbar.views.navbar,
          'page-header@app.gettingStarted.page-layouts.navbar': layouts.presets.navbar.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.navbar': layouts.presets.navbar.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.navbar': layouts.presets.navbar.views.footer,
          'main-content@app.gettingStarted.page-layouts.navbar': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/navbar.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.navbar.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Navbar',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.navbar-fixed', {
        url: '/navbar-fixed',
        views: {
          'container@': layouts.presets.navbarFixed.views.container,
          'navbar@app.gettingStarted.page-layouts.navbar-fixed': layouts.presets.navbarFixed.views.navbar,
          'page-header@app.gettingStarted.page-layouts.navbar-fixed': layouts.presets.navbarFixed.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.navbar-fixed': layouts.presets.navbarFixed.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.navbar-fixed': layouts.presets.navbarFixed.views.footer,
          'main-content@app.gettingStarted.page-layouts.navbar-fixed': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/navbar-fixed.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.navbarFixed.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Navbar Fixed',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.sidebar', {
        url: '/sidebar',
        views: {
          'container@': layouts.presets.sidebar.views.container,
          'sidebar@app.gettingStarted.page-layouts.sidebar': layouts.presets.sidebar.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.sidebar': layouts.presets.sidebar.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.sidebar': layouts.presets.sidebar.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.sidebar': layouts.presets.sidebar.views.footer,
          'main-content@app.gettingStarted.page-layouts.sidebar': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/sidebar.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.sidebar.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Sidebar',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.sidebar-fixed', {
        url: '/sidebar-fixed',
        views: {
          'container@': layouts.presets.sidebarFixed.views.container,
          'sidebar@app.gettingStarted.page-layouts.sidebar-fixed': layouts.presets.sidebarFixed.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.sidebar-fixed': layouts.presets.sidebarFixed.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.sidebar-fixed': layouts.presets.sidebarFixed.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.sidebar-fixed': layouts.presets.sidebarFixed.views.footer,
          'main-content@app.gettingStarted.page-layouts.sidebar-fixed': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/sidebar-fixed.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.sidebarFixed.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Sidebar Fixed',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.sidebar-right', {
        url: '/sidebar-right',
        views: {
          'container@': layouts.presets.sidebarRight.views.container,
          'sidebar@app.gettingStarted.page-layouts.sidebar-right': layouts.presets.sidebarRight.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.sidebar-right': layouts.presets.sidebarRight.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.sidebar-right': layouts.presets.sidebarRight.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.sidebar-right': layouts.presets.sidebarRight.views.footer,
          'main-content@app.gettingStarted.page-layouts.sidebar-right': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/sidebar-right.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.sidebarRight.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Sidebar Right',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
      .state('app.gettingStarted.page-layouts.sidebar-right-fixed', {
        url: '/sidebar-right-fixed',
        views: {
          'container@': layouts.presets.sidebarRightFixed.views.container,
          'sidebar@app.gettingStarted.page-layouts.sidebar-right-fixed': layouts.presets.sidebarRightFixed.views.sidebar,
          'page-header@app.gettingStarted.page-layouts.sidebar-right-fixed': layouts.presets.sidebarRightFixed.views.pageHeader,
          'breadcrumbs@app.gettingStarted.page-layouts.sidebar-right-fixed': layouts.presets.sidebarRightFixed.views.breadcrumbs,
          'footer@app.gettingStarted.page-layouts.sidebar-right-fixed': layouts.presets.sidebarRightFixed.views.footer,
          'main-content@app.gettingStarted.page-layouts.sidebar-right-fixed': {
            templateUrl: '/app/views/gettingStarted/pageLayouts/sidebar-right-fixed.tpl.html',
            controller: 'HomeCtrl as home'
          }
        },
        data: {
          classes: layouts.presets.sidebarRightFixed.classes,
          pageInfo: {
            seo: {
              description: 'Bootstrap & Jquery UI components',
              keywords: 'Bootstrap,Jquery UI'
            },
            title: 'Sidebar Right Fixed',
            description: 'Information on the Included Page Layouts and How to Use Them.'
          }
        }
      })
	  .state('app.gettingStarted.page-layouts.page-sections', {
	    url: '/page-sections',
	    views: {
	      'container@': layouts.presets.navbarFixed.views.container,
	      'navbar@app.gettingStarted.page-layouts.page-sections': layouts.presets.navbarFixed.views.navbar,
	      'page-header@app.gettingStarted.page-layouts.page-sections': layouts.presets.navbarFixed.views.pageHeader,
	      'breadcrumbs@app.gettingStarted.page-layouts.page-sections': layouts.presets.navbarFixed.views.breadcrumbs,
	      'footer@app.gettingStarted.page-layouts.page-sections': layouts.presets.navbarFixed.views.footer,
	      'main-content@app.gettingStarted.page-layouts.page-sections': {
	        templateUrl: '/app/views/gettingStarted/pageLayouts/page-sections.tpl.html',
	        controller: 'HomeCtrl as home'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Bootstrap & Jquery UI components',
	          keywords: 'Bootstrap,Jquery UI'
	        },
	        title: 'Page Sections',
	        description: 'Information on the Different UI-View Sections.'
	      }
	    }
	  });
  }]);
})(angular.module('gettingStarted.pageLayouts.routes', ['ui.router']));