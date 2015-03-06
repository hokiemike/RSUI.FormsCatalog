angular.module('common.directives')
  .directive('decimalInput', function () {

    function format(inputVal, decimalPlaces) {
      var res = '';
      if (inputVal) {
        inputVal = '' + inputVal;

        // default to two decimal places
        decimalPlaces = decimalPlaces || 2;

        //clearing left side zeros
        while (inputVal.charAt(0) == '0') {
          inputVal = inputVal.substr(1);
        }

        inputVal = removeExtraDecimalPoints(inputVal);

        inputVal = inputVal.replace(/[^\d.]/g, '');

        // only format the part left of the decimal
        var parts = inputVal.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parts.length > 1 && parts[1]) {
          parts[1] = parts[1].substring(0, decimalPlaces);
        }
        res = parts.join('.');
      }

      return res;
    };

    function removeExtraDecimalPoints(val) {
      var idx = val.indexOf('.'),
		  lastIdx = val.lastIndexOf('.');

      while (idx > -1 && lastIdx > -1 && idx != lastIdx) {
        val = val.slice(0, lastIdx) + val.slice(lastIdx + 1, val.length);
        idx = val.indexOf('.');
        lastIdx = val.lastIndexOf('.');
      }

      return val;
    }

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        decimalPlaces: '='
      },
      link: function (scope, element, attrs, ctrl) {
        ctrl.$formatters.unshift(function (viewValue) {
          var formatted = format(viewValue, scope.decimalPlaces);
          return formatted;
        });

        ctrl.$parsers.push(function (viewValue) {
          var unformatted = viewValue.replace(/,/g, ''),
			fUnformatted = parseFloat(unformatted);
          fUnformatted = isNaN(fUnformatted) ? 0 : fUnformatted;
          return fUnformatted;
        });

        element.bind('keypress', function (event) {
          // reject non-numerics
          var regex = new RegExp("^[0-9\.]+$");
          var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
          if (!regex.test(key)) {
            event.preventDefault();
            return false;
          }
          return true;
        });

        element.bind('propertychange keyup paste', function (e) {
          var val = format(element.val(), scope.decimalPlaces);
          scope.$apply(function () { element.val(val); });
        });

        element.bind('blur', function (e) {
          var val = element.val();
          if (val && val.indexOf('.') > -1) {
            var parts = val.split('.'),
			  decimalPlaces = scope.decimalPlaces || 2;

            if (parts[1].length < decimalPlaces) {
              parts[1] = window._.str.rpad(parts[1], decimalPlaces, '0');
              val = parts.join('.');
              scope.$apply(function () { element.val(val); });
            }
          }
        });
      }
    };
  });