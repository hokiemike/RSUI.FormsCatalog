angular.module('common.services')
  .factory('StorageService', ['$rootScope', function ($rootScope) {
    //$.cookie.json = true;

    var setValue = function (key, value) {
      var jsonVal = JSON.stringify(value);
      if (Modernizr.localstorage) {
        try {
          localStorage.setItem(key, jsonVal);
        }
        catch (err) {
          // some users have too much localstorage
          setCookie(key, jsonVal);
        }
      }
      else {
        setCookie(key, jsonVal);
      }
    };

    function setCookie(key, value) {
      $.cookie(key, value);
    }

    var getValue = function (key) {
      if (Modernizr.localstorage) {
        try {
          var val = localStorage.getItem(key);
          return val ? JSON.parse(val) : getCookie(key);
        }
        catch (err) {
          return getCookie(key);
        }
      }
      else {
        return getCookie(key);
      }
    };

    function getCookie(key) {
      var val = $.cookie(key);
      if (val) {
        return JSON.parse(val);
      }
      return '';
    }

    var deleteItem = function (key) {
      if (Modernizr.localstorage) {
        localStorage.removeItem(key);
      }
      else {
        $.removeCookie(key);
      }
    };

    return {
      setValue: setValue,
      getValue: getValue,
      deleteItem: deleteItem
    };
  }]);