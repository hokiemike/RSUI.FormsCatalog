angular.module('common.services')
  .factory('ImageRightService', ['$rootScope', function ($rootScope) {

    var openDocument = function (documentId) {
      window.location = "openapp://imageright$$DOCID=" + documentId;
    };

    var openClaim = function (claimNumber) {
      window.location = "openapp://imageright$$DRAWER=Claims|FILETYPE=Claims|FILENUMBER=" + claimNumber;
    };

    var getCurrentDocumentId = function (claimNumber) {
      var irDesktop, app, documentId;
      try {
        irDesktop = new ActiveXObject("ImageRight.DesktopControl");
        app = irDesktop.Application;
        if (!app) {
          toastr.error("ImageRight is not running, please open ImageRight.");
          return null;
        }
        documentId = app.FileManager.DocumentId;
      }
      catch (ex) {
        toastr.error('ImageRight can only be accessed using Internet Explorer');
        return null;
      }
      if (!documentId || documentId < 1) {
        toastr.error('There is no current IR Document open or otherwise could not be located');
      }
      else if (claimNumber && app.FileManager.HasActiveFile && app.FileManager.FileNumber != claimNumber) {
        toastr.error("The claim number on the task is different than the claim number for the selected document in ImageRight");
        return null;
      }
      return documentId;
    };

    return {
      openDocument: openDocument,
      openClaim: openClaim,
      getCurrentDocumentId: getCurrentDocumentId
    };
  }]);