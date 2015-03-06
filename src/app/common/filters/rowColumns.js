(function (module) {
  module.filter('rowColumns', function () {
    return function (items, groupItems, classes) {
      if (items) {
        var newArray = [];
        for (var i = 0; i < items.length; i += groupItems) {
          if (i + groupItems > items.length) {
            newArray.push({ classes: classes, rowData: items.slice(i) });
          } else {
            newArray.push({ classes: classes, rowData: items.slice(i, i + groupItems) });
          }
        }
        return newArray;
      }
      return null;
    };
  });
})(angular.module('common.filters'));