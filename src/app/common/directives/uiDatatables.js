(function (module) {
  'use strict';

  module.directive('uiDatatables', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        // apply DataTable options, use defaults if none specified by user
        var options = {};
        if (attrs.uiDatatables.length > 0) {
          options = scope.$eval(attrs.uiDatatables);
        } else {
          options = {
            "bStateSave": true,
            "iCookieDuration": 2419200,
            "bJQueryUI": false,
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "bDestroy": true
          };
        }

        //// Tell the dataTables plugin what columns to use
        //// We can either derive them from the dom, or use setup from the controller
        //var explicitColumns = [];
        //element.find('th').each(function (index, elem) {
        //  explicitColumns.push($(elem).text());
        //});
        //if (explicitColumns.length > 0) {
        //  options["aoColumns"] = explicitColumns;
        //} else if (attrs.aoColumns) {
        //  options["aoColumns"] = scope.$eval(attrs.aoColumns);
        //}
        //// aoColumnDefs is dataTables way of providing fine control over column config
        //if (attrs.aoColumnDefs) {
        //  options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
        //}
        if (attrs.fnRowCallback) {
          options.fnRowCallback = scope.$eval(attrs.fnRowCallback);
        }

        // apply the plugin
        var dataTable = element.dataTable(options);

        // watch for any changes to our data, rebuild the DataTable
        if (attrs.aaData) {
          scope.$watchCollection(attrs.aaData, function (value) {
            var val = value || null;
            if (val) {
              dataTable.fnClearTable();
              dataTable.fnAddData(scope.$eval(attrs.aaData));
            }
          });
        }

        scope.$on(attrs.id + '.redraw', function (event) {
          $("#"+attrs.id).dataTable({
            bRetrieve: true
          }).fnDraw();
        });

        if (attrs.id) {
          $('select[aria-controls="' + attrs.id + '"]').select2({ minimumResultsForSearch: -1 });
        }
      }
    }
  });
})(angular.module('common.directives'));