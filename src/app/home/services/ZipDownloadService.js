(function (module) {

  module.factory('ZipDownloadService', ['$', '$rootScope', 'UrlService', function ($, $rootScope, urlService) {

    //Objects needed for SignalR
    var connection;
    var proxy;

    var initializeClient = function () {
      //Creating connection and proxy objects
    	connection = $.hubConnection(urlService.baseUrl ? '/' + urlService.baseUrl : '');
      proxy = connection.createHubProxy('zipHub');
      configureProxyClientFunctions();
      start();
    };

    var configureProxyClientFunctions = function () {
      proxy.on('zipDownloadReady', function (result) {
        $rootScope.$broadcast('zipDownload.Ready', result);
      });
      proxy.on('zipDownloadFailed', function (result) {
        $rootScope.$broadcast('zipDownload.Failed', result);
      });
      proxy.on('emailSent', function (result) {
      	$rootScope.$broadcast('email.Sent', result);
      });
      proxy.on('emailFailed', function (result) {
      	$rootScope.$broadcast('email.Failed', result);
      });
    };

    var start = function () {
      connection.start().done(function () {
        console.log('The signalr hub initialization is complete.  Raising the complete event.');
        $rootScope.$broadcast("raiseHubInitializationComplete");
      });
    };

    var reset = function () {
      proxy.invoke('reset');
    };

    return {
      initializeClient: initializeClient,
      reset: reset
    };
  }]);
})(angular.module('home.services'));