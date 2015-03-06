(function (module) {
  module.factory('SignalrService', ['$rootScope', function ( $rootScope) {
    var signalrService = {
      connection: null,
      proxy: null,
      initializationComplete: false,
      /// Initialize the SignalR Hub.
      intializeClient: function () {
        console.log('initializing the signalrServiceBase.intializeClient()');
        if (this.connection === null) {
          signalrService.connection = $.hubConnection();
          signalrService.proxy = signalrService.connection.createHubProxy('zipHub');
          signalrService.start();
        }
        else {
          console.log('The signalr hub initialization has been previously completed.  Raising the complete event.');
          $rootScope.$broadcast("raiseHubInitializationComplete");
        }
      },
      start: function () {
        //starting the connection and initializing market             
        this.connection.start().done(function () {
          signalrService.initializationComplete = true;
          console.log('The signalr hub initialization is complete.  Raising the complete event.');
          $rootScope.$broadcast("raiseHubInitializationComplete");
        });
      },
      reset: function () {
        signalrService.proxy.invoke('reset');
      }
    };
    return signalrService;
  }]);
})(angular.module('common.services'));