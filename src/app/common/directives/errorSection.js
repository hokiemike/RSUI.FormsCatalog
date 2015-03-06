angular.module('common.directives')
  .directive('errorSection', ['urlService', function (urlService) {
    return {
      restrict: 'E',
      require: '^ngModel',
      templateUrl: urlService.getTemplateUrl('common/errorSection.html')
    };
  }]);