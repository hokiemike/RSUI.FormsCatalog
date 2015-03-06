angular.module('common.filters')
  .filter('status', function () {
    return function (input) {
      var status;
      switch (input) {
        case 'O':
          status = 'Open';
          break;
        case 'C':
          status = 'Closed';
          break;
        default:
          status = '';
          break;
      }
      return status;
    };
  }
);