/// <reference path="../../_all.ts" />
var RsuiUtils;
(function (RsuiUtils) {
  (function (Arrays) {
    function ArrayFilter(array, predicate) {
      array = array || [];
      var result = [];
      for (var i = 0, j = array.length; i < j; i++)
        if (predicate(array[i]))
          result.push(array[i]);
      return result;
    }
    Arrays.ArrayFilter = ArrayFilter;
    ;
    function ArrayPushAll(array, valuesToPush) {
      if (valuesToPush instanceof Array)
        array.push.apply(array, valuesToPush);
      else
        for (var i = 0, j = valuesToPush.length; i < j; i++)
          array.push(valuesToPush[i]);
      return array;
    }
    Arrays.ArrayPushAll = ArrayPushAll;
    ;
    function ArrayForEach(array, action) {
      for (var i = 0, j = array.length; i < j; i++)
        action(array[i]);
    }
    Arrays.ArrayForEach = ArrayForEach;
    ;
    function ArrayIndexOf(array, item) {
      if (typeof Array.prototype.indexOf == "function")
        return Array.prototype.indexOf.call(array, item);
      for (var i = 0, j = array.length; i < j; i++)
        if (array[i] === item)
          return i;
      return -1;
    }
    Arrays.ArrayIndexOf = ArrayIndexOf;
    ;
    function ArrayFirst(array, predicate, predicateOwner) {
      for (var i = 0, j = array.length; i < j; i++)
        if (predicate.call(predicateOwner, array[i]))
          return array[i];
      return null;
    }
    Arrays.ArrayFirst = ArrayFirst;
    ;
  })(RsuiUtils.Arrays || (RsuiUtils.Arrays = {}));
  var Arrays = RsuiUtils.Arrays;
})(RsuiUtils || (RsuiUtils = {}));
var RsuiUtils;
(function (RsuiUtils) {
  (function (Strings) {
    //Format = function () {
    //	/// <summary>
    //	/// Replaces tokens in a string with the supplied parameters.
    //	/// </summary>
    //	/// <param name="string" type="String">
    //	///     The string to search for the tokens.
    //	/// </param>
    //	/// <param name="params" type="Arguments">
    //	///     A parameter list of tokens to replace.
    //	/// </param>
    //	/// <returns>
    //	///     The string with the tokens replaced.
    //	/// </returns>
    //	var s = arguments[0];
    //	for (var i = 0; i < arguments.length - 1; i++) {
    //		var reg = new RegExp("\\{" + i + "\\}", "gm");
    //		s = s.replace(reg, this.Convert.toString(arguments[i + 1]));
    //	}
    //	return s;
    //};
    function EndsWith(string, suffix) {
      /// <summary>
      /// Searches the end of a string for another string.
      /// </summary>
      /// <param name="string" type="String">
      ///     The string to check.
      /// </param>
      /// <param name="suffix" type="String">
      ///     The suffix to look for.
      /// </param>
      /// <returns>
      ///     Returns true if the string ends with the supplied suffix.
      /// </returns>
      return (string.substr(string.length - suffix.length) === suffix);
    }
    Strings.EndsWith = EndsWith;
    ;
    function StartsWith(string, prefix) {
      /// <summary>
      /// Searches the start of a string for another string.
      /// </summary>
      /// <param name="string" type="String">
      ///     The string to check.
      /// </param>
      /// <param name="prefix" type="String">
      ///     The prefix to look for.
      /// </param>
      /// <returns>
      ///     Returns true if the string ends with the supplied prefix.
      /// </returns>
      return (string.substr(0, prefix.length) === prefix);
    }
    Strings.StartsWith = StartsWith;
    ;
    function TrimEnd(string, chars) {
      /// <summary>
      /// Trims a list of characters from the end of a string.
      /// </summary>
      /// <param name="string" type="String">
      ///     The string to trim.
      /// </param>
      /// <param name="chars" type="String">
      ///     The characters to trim off the end of the string.
      /// </param>
      /// <returns>
      ///     The string with the characters trimmed off the end.
      /// </returns>
      if (this.EndsWith(string, chars)) {
        return string.substring(0, string.length - chars.length);
      }

      return string;
    }
    Strings.TrimEnd = TrimEnd;
    ;
    function TrimStart(string, chars) {
      /// <summary>
      /// Trims a list of characters from the start of a string.
      /// </summary>
      /// <param name="string" type="String">
      ///     The string to trim.
      /// </param>
      /// <param name="chars" type="String">
      ///     The characters to trim off the start of the string.
      /// </param>
      /// <returns>
      ///     The string with the characters trimmed off the start.
      /// </returns>
      if (this.StartsWith(string, chars)) {
        return string.substring(chars.length, string.length);
      }

      return string;
    }
    Strings.TrimStart = TrimStart;
    ;
    function Repeat(string, count) {
      /// <summary>
      /// Repeats a string the specified amount of times.
      /// </summary>
      /// <param name="string" type="String">
      ///     The string to repeat.
      /// </param>
      /// <param name="chars" type="String">
      ///     The number of times to repeat the string.
      /// </param>
      /// <returns>
      ///     The repeated string sequence.
      /// </returns>
      return new Array(count + 1).join(string);
    }
    Strings.Repeat = Repeat;
    ;
  })(RsuiUtils.Strings || (RsuiUtils.Strings = {}));
  var Strings = RsuiUtils.Strings;
})(RsuiUtils || (RsuiUtils = {}));
var RsuiUtils;
(function (RsuiUtils) {
  (function (Json) {
    function Stringify(data, replacer, space) {
      if ((typeof JSON == "undefined") || (typeof JSON.stringify == "undefined"))
        throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
      return JSON.stringify(data, replacer, space);
    }
    Json.Stringify = Stringify;
    ;
  })(RsuiUtils.Json || (RsuiUtils.Json = {}));
  var Json = RsuiUtils.Json;
})(RsuiUtils || (RsuiUtils = {}));
var RsuiUtils;
(function (RsuiUtils) {
  (function (Events) {
    function GetTarget(evt) {
      var targetElement = null;

      //if it is a standard browser
      if (typeof evt.target != 'undefined') {
        targetElement = evt.target;
      } else {
        targetElement = evt.srcElement;
      }

      return targetElement;
    }
    Events.GetTarget = GetTarget;
    ;
  })(RsuiUtils.Events || (RsuiUtils.Events = {}));
  var Events = RsuiUtils.Events;
})(RsuiUtils || (RsuiUtils = {}));

var RsuiUtils;
(function (RsuiUtils) {
  (function (DataTables) {
    /* **************************************************************************************** */
    /* Use this method to convert the DataTables Command Criteria                               */
    /* **************************************************************************************** */
    function ConvertAoData(srcOptions) {
      var arrUtils = RsuiUtils.Arrays;
      var strUtils = RsuiUtils.Strings;

      var getColIndex = function (name) {
        var matches = name.match("\\d+");
        if (matches && matches.length)
          return matches[0];
        return null;
      };
      var getAdjustedColIndex = function (colIndex) {
        var result = [];
        for (var i = 0, j = colIndex; i < j; i++)
          if (arrUtils.ArrayIndexOf(columnsToIgnore, i.toString()) >= 0)
            result.push(i);
        return colIndex - result.length;
      };

      var destOptions = { Columns: [], Echo: '', RecordsToSkip: 0, RecordsToTake: 10, GlobalSearchText: '' };
      var columnsToIgnore = [];

      arrUtils.ArrayForEach(srcOptions, function (item) {
        var colIndex = getColIndex(item.name);
        if (strUtils.StartsWith(item.name, "iSortCol_") || arrUtils.ArrayIndexOf(columnsToIgnore, colIndex) == -1) {
          if (colIndex && strUtils.StartsWith(item.name, "mDataProp_"))
            if (item.value == null) {
              columnsToIgnore.push(colIndex);
              return;
            } else
              destOptions.Columns.push(new Object());

          if (item.name == "sEcho")
            destOptions.Echo = item.value;
          else if (item.name == "iDisplayStart")
            destOptions.RecordsToSkip = item.value;
          else if (item.name == "iDisplayLength")
            destOptions.RecordsToTake = item.value;
          else if (item.name == "sSearch")
            destOptions.GlobalSearchText = item.value;
          else if (strUtils.StartsWith(item.name, "bSearchable_"))
            destOptions.Columns[getAdjustedColIndex(colIndex)].IsSearchable = item.value;
          else if (strUtils.StartsWith(item.name, "sSearch_"))
            destOptions.Columns[getAdjustedColIndex(colIndex)].SearchText = item.value;
          else if (strUtils.StartsWith(item.name, "mDataProp_"))
            destOptions.Columns[getAdjustedColIndex(colIndex)].ColumnName = item.value;
          else if (strUtils.StartsWith(item.name, "iSortCol_")) {
            destOptions.Columns[getAdjustedColIndex(item.value)].IsSorted = true;
            destOptions.Columns[getAdjustedColIndex(item.value)].SortOrder = colIndex;

            var sortOrder = arrUtils.ArrayFilter(srcOptions, function (element) {
              return element.name == "sSortDir_" + colIndex;
            });
            destOptions.Columns[getAdjustedColIndex(item.value)].SortDirection = sortOrder[0].value;
          }
        }
      });

      return destOptions;
    }
    DataTables.ConvertAoData = ConvertAoData;

    function PostData(url, command, authToken, callback, errorCallback) {
      var json = RsuiUtils.Json;
      this.PostJsonData(url, json.Stringify(this.ConvertAoData(command), null, null), authToken, function (results) {
        callback(results);
      }, function (jqXhr, textStatus, errorThrown) {
        errorCallback(jqXhr, textStatus, errorThrown);
      });
    }
    DataTables.PostData = PostData;

    /* **************************************************************************************** */
    /* Use this method when you have already converted the DataTables Command Criteria yourself */
    /* and already converted to JSON                                                            */
    /* **************************************************************************************** */
    function PostJsonData(url, data, authToken, callback, errorCallback) {
      var ajax = RsuiUtils.Ajax;
      ajax.Post(url, data, authToken, function (results) {
        callback(results);
      }, function (jqXhr, textStatus, errorThrown) {
        errorCallback(jqXhr, textStatus, errorThrown);
      });
    }
    DataTables.PostJsonData = PostJsonData;
    ;

    /* **************************************************************************************** */
    /* Use this method when you have already converted the DataTables Command Criteria yourself */
    /* but have not already converted to JSON                                                   */
    /* **************************************************************************************** */
    function PostConvertedAoData(url, data, authToken, callback, errorCallback) {
      var json = RsuiUtils.Json;
      this.PostJsonData(url, json.Stringify(data, null, null), authToken, function (results) {
        callback(results);
      }, function (jqXhr, textStatus, errorThrown) {
        errorCallback(jqXhr, textStatus, errorThrown);
      });
    }
    DataTables.PostConvertedAoData = PostConvertedAoData;
    ;
  })(RsuiUtils.DataTables || (RsuiUtils.DataTables = {}));
  var DataTables = RsuiUtils.DataTables;
})(RsuiUtils || (RsuiUtils = {}));

var RsuiUtils;
(function (RsuiUtils) {
  (function (Ajax) {
    var json = RsuiUtils.Json;
    var dataTables = RsuiUtils.DataTables;

    function DataTableRequest(url, command, authToken, callback) {
      this.Post(url, json.Stringify(dataTables.ConvertAoData(command), null, null), authToken, function (results) {
        callback(results);
      });
    }
    Ajax.DataTableRequest = DataTableRequest;

    function Get(url, data, authToken, callback) {
      $.ajax({
        url: url,
        data: data,
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        accept: "application/json",
        beforeSend: function (req) {
          req.setRequestHeader('Authorization', authToken);
        },
        statusCode: {
          200: function (responseData, textStatus, jqXhr) {
            callback(responseData);
          },
          401: function (responseData, textStatus, jqXhr) {
            window.location.href = "/Account/Login";
          },
          406: function (responseData, textStatus, jqHxr) {
          }
        }
      });
    }
    Ajax.Get = Get;

    function Post(url, data, authToken, successCallback, errorCallback) {
      $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        accept: "application/json",
        beforeSend: function (req) {
          if (authToken !== null && authToken !== undefined)
            req.setRequestHeader('Authorization', authToken);
        },
        success: function (responseData, textStatus, jqXhr) {
          successCallback(responseData, textStatus, jqXhr);
        },
        error: function (jqXhr, textStatus, errorThrown) {
          errorCallback(jqXhr, textStatus, errorThrown);
        }
      });
    }
    Ajax.Post = Post;
  })(RsuiUtils.Ajax || (RsuiUtils.Ajax = {}));
  var Ajax = RsuiUtils.Ajax;
})(RsuiUtils || (RsuiUtils = {}));
//# sourceMappingURL=WteIncDataTables.js.map
