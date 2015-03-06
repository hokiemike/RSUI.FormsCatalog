angular.module('common.directives')
  .directive('googleaddress', function () {
    var linker = function (scope, element, attrs, model) {
      var options = { types: ['geocode'] };

      scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
      geolocate(scope.gPlace);

      google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
        scope.$apply(function () {
          scope.ngModel = scope.gPlace.getPlace();
        });
      });
      // return "<input value='{{returnAddress}}' type='text'/>";
      //scope.returnAddress = "bar";
    };

    function geolocate(element) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var geolocation = new google.maps.LatLng(
			  position.coords.latitude, position.coords.longitude);
          element.setBounds(new google.maps.LatLngBounds(geolocation,
			  geolocation));
        });
      }
    }

    return {
      restrict: 'A',
      link: linker,
      require: '^ngModel',
      scope: {
        ngModel: '=',
      }
    };
  })