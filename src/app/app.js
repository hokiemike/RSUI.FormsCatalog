(function() {
  angular.module('app', [
      'app.constants',
      'common.providers',
      'app.routes',

      // our modules
      'layout',
      'common',
      'gettingStarted',
      'home',
      'interface',
      'account',

      //3rd Party
      'ui.router',
      'ngAnimate',
      'ngSanitize',

      // Bootstrap UI, in order to use Both AngularStrap and Angular UI Bootstrap,
      // specify the specific modules that do not conflict or do the same thing.
      'mgcrea.ngStrap.modal',
      'ui.bootstrap.accordion',
      'ui.bootstrap.popover',
      'ui.bootstrap.tpls'
    ])
    .config([
      '$urlRouterProvider', '$httpProvider', function($urlRouterProvider, $httpProvider) {
        $urlRouterProvider.rule(function($i, $location) {
          var path = $location.path();
          return path.toLowerCase();
        });
      }
    ])
    .run([
      '$rootScope', '$state', '$stateParams', 'AppSettings', 'Logger', 'AccountService', 'AvailableDepartments', function($rootScope, $state, $stateParams, appSettings, logger, accountService, availableDepartments) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.spinEvent = {};
        $rootScope.appName = appSettings.appName;
        $rootScope.version = appSettings.version;
        $rootScope.bodyClasses = '';
        $rootScope.navClasses = '';
        $rootScope.sidebarClasses = '';
        $rootScope.departmentId = 0;
        $rootScope.departmentObj = { id: 200, text: 'Property' };

        $rootScope.$on(appSettings.events.controllerActivateSuccess, function(event, data) {
          $rootScope.spinEvent.isBusy = false;
        });

        $rootScope.$on(appSettings.events.spinnerToggle, function(event, data) {
          $rootScope.spinEvent.isBusy = data.show;
          if (data.busyMessage)
            $rootScope.spinEvent.busyMessage = data.busyMessage;
        });

        $rootScope.$on('$stateChangeStart', function(event, to, toParams, from, fromParams) {
          if (to.name != 'error.401' && to.name != 'error.404') {
            accountService.getUser().then(function(user) {
              if (to.data.security && to.data.security.roles && !accountService.userHasRole(user, to.data.security.roles)) {
                logger.log(to.data.pageTitle + " failed authentication.", Logger.WarningSettings);
                event.preventDefault();
                $state.go('error.401');
              }
              else {
                if (user.ExternalUser) {
                  var baDepartment = 10006;
                  user.Departments = _.where(user.Departments, { id: baDepartment });
                  if (!user.Departments || !user.Departments.length) {
                    $state.go('error.401');
                  }
                  else {
                    $rootScope.departmentId = user.Departments[0].id;
                    $rootScope.departmentObj = user.Departments[0];

                  }
                }
                else {
                  if (user.Department) {
                    if (_.findIndex(availableDepartments, { 'id': user.Department.Id }) >= 0)
                      $rootScope.departmentId = user.Department.Id;
                    else
                      $rootScope.departmentId = 200;
                    $rootScope.departmentObj = _.where(availableDepartments, { 'id': $rootScope.departmentId })[0];
                    $rootScope.department = _.where(availableDepartments, { 'id': $rootScope.departmentId })[0];
                  }
                  else {
                    $state.go('error.401');
                  }
                }
              }

              if (to.controller) {
                $rootScope.spinEvent.isBusy = true;
                $rootScope.spinEvent.busyMessage = 'Loading ' + to.data.pageInfo.title + ' ...';
              }
              $rootScope.title = appSettings.docTitlePrefix + to.data.pageInfo.title;
            }, function(rejection) {
              $state.go('error.401');
            });
          }
        });

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
          logger.log(unfoundState.to + '<br/>' + unfoundState.toParams + '<br/>' + unfoundState.options, Logger.WarningSettings);
          $state.go('error.404');
        });

        $rootScope.$on('$stateChangeError', function(event, to, toParams, from, fromParams, error) {
          logger.log(to.data.pageInfo.title + " Has failed to load.", Logger.WarningSettings);
          if (error === 'Get Roles Failed: Bad Request')
            $state.go('error.401');
          else {
            $state.go('error.404');
          }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
          logger.log(to.data.pageInfo.title + " has been loaded.", Logger.InfoSettings);
          if ($rootScope.bodyClasses !== to.data.classes.body) {
            $rootScope.bodyClasses = to.data.classes.body;
            $rootScope.$broadcast('bodyClassesChanged');
          }
          $rootScope.navbarClasses = to.data.classes.navbar;
          $rootScope.sidebarClasses = to.data.classes.sidebar;
          $rootScope.$broadcast("ajax-stop");
        });
      }
    ]);
}());
