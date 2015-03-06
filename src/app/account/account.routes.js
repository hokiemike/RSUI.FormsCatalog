angular.module('account.routes', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
	  .state('app.account', {
	    url: '/account',
	    'abstract': true,
      views: {
        'container@': {
          templateUrl: '/app/views/layout/view-left-nav-only.tpl.html'
        },
        'sidebar@app.account': {
          templateUrl: '/app/views/layout/sidebar.tpl.html',
          controller: 'LayoutSidebarCtrl as sidebar'
        }
      }
	  })
	  .state('app.account.login', {
	    url: '/login',
	    views: {
	      'container@': {
	        templateUrl: '/app/views/account/account-login.tpl.html',
	        controller: 'AccountLoginCtrl as login'
	      }
	    },
	    data: {
	      settings: {
	        pageTitle: 'Login'
	      },
	      security: {
	        auth: false
	      }
	    }
	  })
	  .state('app.account.logout', {
	    url: '/logout',
	    views: {
	      'container@': {
	        templateUrl: '/app/views/account/account-logout.tpl.html',
	        controller: 'AccountLogoutCtrl as logout'
	      }
	    },
	    data: {
	      settings: {
	        pageTitle: 'Logout'
	      },
	      security: {
	        auth: false
	      }
	    }
	  })
	  .state('app.account.profile', {
	    url: '/profile',
	    views: {
	      'main-content@app.account': {
	        templateUrl: '/app/views/account/account-profile.tpl.html',
	        controller: 'AccountProfileCtrl as apc'
	      }
	    },
	    data: {
        settings: {
          pageTitle: 'Account Profile'
        },
        security: {
          auth: false
        }
      }
	  })
	  .state('app.account.messages', {
	    url: '/messages',
	    'abstract': true
	  })
	  .state('app.account.messages.today', {
	    url: '/today',
	    views: {
	      'main-content@app.account': {
	        templateUrl: '/app/views/account/account-messages-today.tpl.html',
	        controller: 'AccountMessagesCtrl as amc'
	      }
	    },
	    data: {
	      settings: {
	        pageTitle: 'Today\s Messages'
	      },
	      security: {
	        auth: false
	      }
	    }
	  })
	  .state('app.account.messages.all', {
	    url: '/all',
	    views: {
	      'main-content@app.account': {
	        templateUrl: '/app/views/account/account-messages-all.tpl.html',
	        controller: 'AccountMessagesCtrl as amc'
	      }
	    },
	    data: {
	      settings: {
	        pageTitle: 'All Messages'
	      },
	      security: {
	        auth: false
	      }
	    }
	  });
  }]);