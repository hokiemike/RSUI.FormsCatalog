(function (module) {
  'use strict';

  module.provider('layoutSvc', function () {

    var current = function () {
      return ''; // settings[settings.baseLayout];
    };

    var getLayout = function (layout) {
      return ''; // settings[layout];
    };


    this.$get = function () {
      var name = this.name;
      return {
        base: current,
        getLayout: getLayout
      }
    };
  });
})(angular.module('layout.services'));