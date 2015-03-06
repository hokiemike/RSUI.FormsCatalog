(function () {
    'use strict';

    var controllerId = 'controller1';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', controller1]);

    function controller1($scope) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'controller1';

        function activate() { }
    }
})();
