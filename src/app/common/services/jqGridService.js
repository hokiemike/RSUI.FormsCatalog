angular.module('common.services')
  .factory('JqGridService', ['$rootScope', function ($rootScope) {

    function onGridCreate(id) {
      var $tbl = $("#" + id);
      $tbl.keydown(onUpDownPressed);
      $(".ui-icon-seek-next").addClass("fa fa-angle-right");
      $(".ui-icon-seek-end").addClass("fa fa-angle-double-right");
      $(".ui-icon-seek-prev").addClass("fa fa-angle-left");
      $(".ui-icon-seek-first").addClass("fa fa-angle-double-left");
    }

    function onUpDownPressed(e) {
      var $tbl = $(e.target).parents("table.ui-jqgrid-btable:first");
      var ids = $tbl.getDataIDs();
      var selRow = $tbl.getGridParam("selrow");
      var idx = _.indexOf(ids, selRow);

      if (idx > -1) {
        if (e.keyCode == 38) { // up
          if ((idx - 1) >= 0)
            $tbl.resetSelection().setSelection(ids[idx - 1], true);
        }
        if (e.keyCode == 40) { //down;
          if ((idx + 1) < ids.length)
            $tbl.resetSelection().setSelection(ids[idx + 1], true);
        }
      }
    }

    return {
      onGridCreate: onGridCreate
    };
  }]);