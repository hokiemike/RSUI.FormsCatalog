(function (module) {
  module.factory('AmplifyService', function () {
    'use strict';

    var save = function (name, data) {
      amplify.store(name, data);
    };

    var retrieve = function (name) {
      return amplify.store(name);
    };

    var clearStore = function (name) {
      return amplify.store(name, null);
    };

    return {
      save: save,
      retrieve: retrieve,
      clearStore: clearStore
    }
  });

})(angular.module('common.services'));
