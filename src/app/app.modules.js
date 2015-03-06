angular.module('app.constants', []);

angular.module('common', [
  'common.directives',
  'common.services',
  'common.filters'
]);

angular.module('layout', [
  'layout.controllers',
  'layout.directives',
  'layout.services'
]);

angular.module('account', [
  'account.routes',
  'account.controllers',
  'account.services'
]);

angular.module('interface', [
  'interface.routes',
  'interface.controllers'
]);

angular.module('home', [
  'home.routes',
  'home.controllers',
  'home.services',
  'home.directives'
]);

angular.module('gettingStarted', [
  'gettingStarted.routes',
  'gettingStarted.pageLayouts.routes',
  'gettingStarted.errorPages.routes',
  'gettingStarted.controllers',
  'gettingStarted.pageLayouts.controllers',
  'gettingStarted.errorPages.controllers'
]);