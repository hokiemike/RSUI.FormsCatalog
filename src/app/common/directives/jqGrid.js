angular.module('common.directives')
  .directive('jqGrid', ['$compile', 'jqGridService', function ($compile, jqGridService) {
    return {
      restrict: 'E',
      scope: {
        id: '=',
        config: '=',
        data: '=',
        hidePager: '='
      },
      compile: function () {
        return {
          pre: function (scope, element) {

            function makeid() {
              var text = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

              return text;
            }

            function loadData(data) {
              var $tbl = $("table.ui-jqgrid-btable:first", element);
              $tbl.clearGridData().trigger("reloadGrid");
              $tbl.jqGrid()
                .setGridParam({ 'data': data, "page": 1 })
                .trigger("reloadGrid");
              //uiService.hidePleaseWaitMessage();
              $compile(element)(scope);
            }

            var table;

            scope.$watch('config', function (newValue) {
              if (newValue) {
                var gridId = scope.id || makeid(),
                  pagerId = scope.hidePager ? '' : gridId + "_pager";
                if (gridId) {
                  newValue.pager = "#" + pagerId;
                  element.children().empty();
                  var ngTable = $compile('<table id="' + gridId + '"></table>')(scope);

                  table = angular.element(ngTable);
                  element.append(table).append(angular.element('<div id="' + pagerId + '"></div>'));
                  $(table).jqGrid(newValue);
                  jqGridService.onGridCreate(gridId);
                  $compile(element)(scope);
                  if (scope.data) {
                    loadData(scope.data);
                  }
                }
              }
            });
            scope.$watch('data', function (newValue, oldValue) {
              if (newValue != oldValue) {
                loadData(newValue);
              }
            });
          },
          post: function (scope, element) {

          }
        };
      },
      replace: true
    };
  }]);