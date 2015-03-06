angular.module('common.directives')
  .directive('numericInput', function () {

    function format(inputVal) {
      var res = '';
      if (inputVal) {
        inputVal = '' + inputVal;

        //clearing left side zeros
        while (inputVal.charAt(0) == '0') {
          inputVal = inputVal.substr(1);
        }

        var val = inputVal.toString().replace(/,/g, '');
        res = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      return res;
    };

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$formatters.unshift(function (viewValue) {
          var formatted = format(viewValue);
          return formatted;
        });

        ctrl.$parsers.push(function (viewValue) {
          var unformatted = viewValue.replace(/,/g, ''),
			iUnformatted = parseInt(unformatted);
          iUnformatted = isNaN(iUnformatted) ? 0 : iUnformatted;
          return iUnformatted;
        });

        element.bind('keypress', function (event) {
          // reject non-numerics
          var regex = new RegExp("^[0-9]+$");
          var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
          if (!regex.test(key)) {
            event.preventDefault();
            return false;
          }
          return true;
        });

        element.bind('propertychange keyup paste', function () {
          var val = format(element.val());
          scope.$apply(function () { element.val(val); });
        });
      }
    };
  });