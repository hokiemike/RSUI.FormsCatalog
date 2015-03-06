(function(module) {
  module.filter('to_trusted', ['$sce', function($sce) {
    return function(val)  {
      return $sce.trustAsHtml(val);
    }
  }]);
})(angular.module('common.directives'));