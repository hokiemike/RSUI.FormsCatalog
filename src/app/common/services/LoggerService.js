var TLogType;
(function (TLogType) {
  TLogType[TLogType["Info"] = 0] = "Info";
  TLogType[TLogType["Success"] = 1] = "Success";
  TLogType[TLogType["Error"] = 2] = "Error";
  TLogType[TLogType["Warning"] = 3] = "Warning";
})(TLogType || (TLogType = {}));

var TToastrType;
(function (TToastrType) {
  TToastrType[TToastrType["Info"] = 0] = "Info";
  TToastrType[TToastrType["Success"] = 1] = "Success";
  TToastrType[TToastrType["Error"] = 2] = "Error";
  TToastrType[TToastrType["Warning"] = 3] = "Warning";
})(TToastrType || (TToastrType = {}));

var Logger = (function () {
  function Logger($log, settings) {
    var _this = this;
    this.$log = $log;
    this.settings = settings;
    this.log = function (message, toastrConfig, title, moduleId, data, showToastr) {
      toastrConfig = toastrConfig || Logger.SuccessSettings;
      showToastr = showToastr || _this.settings.showToastr;
      if (showToastr) {
        var write = (toastrConfig.toastrType === 2 /* Error */) ? _this.$log.error : _this.$log.log;
        write(moduleId ? '[' + moduleId + '] ' : '', message, data ? data : '');
        switch (toastrConfig.toastrType) {
          case 2 /* Error */:
            toastr.error(message, title, toastrConfig.options);
            break;
          case 3 /* Warning */:
            toastr.warning(message, title, toastrConfig.options);
            break;
          case 1 /* Success */:
            toastr.success(message, title, toastrConfig.options);
            break;
          case 0 /* Info */:
            toastr.info(message, title, toastrConfig.options);
            break;
        }
      }
    };
  }
  Logger.serviceId = "Logger";

  Logger.SuccessSettings = {
    toastrType: 1 /* Success */,
    options: {
      positionClass: "toast-bottom-right"
    }
  };

  Logger.InfoSettings = {
    toastrType: 0 /* Info */,
    options: {
      positionClass: "toast-bottom-right"
    }
  };

  Logger.WarningSettings = {
    toastrType: 3 /* Warning */,
    options: {
      positionClass: "toast-top-right"
    }
  };

  Logger.ErrorSettings = {
    toastrType: 2 /* Error */,
    options: {
      closeButton: true,
      positionClass: "toast-top-right",
      timeOut: 0,
      extendedTimeOut: 0
    }
  };
  return Logger;
})();

angular.module('common.services').factory(Logger.serviceId, ['$log', 'AppSettings', function ($log, settings) {
  return new Logger($log, settings);
}]);