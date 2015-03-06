(function() {
  angular.module('common.services')
    .factory('UrlService', [
      '$rootScope', 'UiService', UrlService
    ]);

  function UrlService($rootScope, uiService) {
    var baseUrl = $('#appUrl').val();
    var apiRootUrl = $('#apiUrl').val();
    var formsServiceUrl = $("formsServiceUrl").val();

    var urlForFormService = function(docId) {
      return formsServiceUrl + docId;
    };

    var urlFor = function(urlOptions) {
      var startUrl = urlOptions.baseUrl || baseUrl;
      return createUrlFor(startUrl, urlOptions);
    };

    var apiUrlFor = function(urlOptions) {
      return createUrlFor(apiRootUrl + "/api/", urlOptions);
    };

    var apiJsonpUrFor = function(urlOptions) {
      // include a JSONP callback reference for angular
      urlOptions.callback = "JSON_CALLBACK";
      return createUrlFor(apiRootUrl + "/api/", urlOptions);
    };

    var rpcUrlFor = function(urlOptions) {
      return createUrlFor(apiRootUrl + "/rpc/", urlOptions);
    };

    var rpcJsonpUrlFor = function(urlOptions) {
      // include a JSONP callback reference for angular
      urlOptions.callback = "JSON_CALLBACK";
      return createUrlFor(apiRootUrl + "/rpc/", urlOptions);
    };

    var apiPostUrlFor = function(urlOptions) {
      return createUrlFor(apiRootUrl + "/api/", urlOptions);
    };

    var goToUrl = function(url) {
      window.location = url;
    };

    var goToUrlNewWindow = function(url) {
      window.open(url, '_blank');
    };

    var goToHomePage = function(opts) {
      opts = opts || {};
      $.extend(opts, { "action": "Index", "controller": "Home" });
      var homeUrl = urlFor(opts);
      window.location = homeUrl;
    };

    var getTemplateUrl = function(fileName) {
      var template = baseUrl + '/template/app/' + fileName;
      return template;
    };

    var noOp = function() {};

    function createUrlFor(startUrl, urlOptions) {
      var url = startUrl;

      if (urlOptions.area) {
        url += urlOptions.area + '/';
      }
      url += urlOptions.controller;
      if (urlOptions.action) {
        url += '/' + urlOptions.action;
      }
      if (urlOptions.id) {
        url += '/' + urlOptions.id;
      }

      if (urlOptions.subpath && urlOptions.subpath.length) {
        if (url[url.length - 1] != '/') {
          url += '/';
        }
        var subpath = angular.isArray(urlOptions.subpath) ? urlOptions.subpath : [urlOptions.subpath];
        url += subpath.join('/');
      }

      var ignoreProperties = ['area', 'controller', 'action', 'id', 'subpath'];

      url += createQueryString(urlOptions, ignoreProperties);

      return url;
    }

    var createQueryString = function(urlOptions, ignoreProperties) {
      var dateTesters = [
        /^(0?[1-9])[- /.](0?[1-9]|[1-2][0-9]|3[0-1])[- /.](19|20\d{2})$/, // MM/DD/YYYY
        /^(\w{3}\s\w{3}\s(0?[1-9]|[1-2][0-9]|3[0-1])\s\d{4}\s\d{2}:\d{2}:\d{2})/, // Wed Jan 01 2014 00:00:00
        /^(\w{3}\s\w{3}\s(0?[1-9]|[1-2][0-9]|3[0-1])\s\d{2}:\d{2}:\d{2}\s\w{3}\s\d{4})/ // Wed Jan 01 00:00:00 EDT 2014
      ];

      var queryString = '',
        nvp = [];

      for (var key in urlOptions) {
        if (urlOptions.hasOwnProperty(key) &&
        (!ignoreProperties || !ignoreProperties.length || !_.contains(ignoreProperties, key))) {
          var val = urlOptions[key];
          // check to see if it is a date
          if (_.find(dateTesters, function(re) { return re.test(val); })) {
            var dt = moment(val);
            if (dt.isValid()) {
              val = dt.format(); // 2014-01-01T00:00:00-05:00
            }
          }
          nvp.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
        }
      }

      if (nvp && nvp.length) {
        queryString += "?" + nvp.join('&');
      }

      return queryString;
    }

    var parseQueryString = function() {
      var qs = window.location.search,
        params = {};

      if (qs) {
        qs = qs.split("+").join(" ");

        var tokens,
          re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
          params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
      }

      return params;
    }

    var openIframe = function(url) {
      uiService.showPleaseWaitMessage();
      var iframe = '<iframe src="' + url + '" width="100%" height="1200px"/>';
      $("#claims-content").html(iframe);
      $("iframe", "#claims-content").load(uiService.hidePleaseWaitMessage);
    }

    return {
      baseUrl: baseUrl,
      urlFor: urlFor,
      urlForFormService: urlForFormService,
      apiUrlFor: apiUrlFor,
      apiJsonpUrlFor: apiJsonpUrFor,
      rpcUrlFor: rpcUrlFor,
      rpcJsonpUrlFor: rpcJsonpUrlFor,
      goToUrl: goToUrl,
      goToUrlNewWindow: goToUrlNewWindow,
      goToHomePage: goToHomePage,
      getTemplateUrl: getTemplateUrl,
      createQueryString: createQueryString,
      parseQueryString: parseQueryString,
      openIframe: openIframe
    };
  }

}());