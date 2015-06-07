'use strict';

/**
 * This module provides the proxy configuration for the dev server.
 */
module.exports = function (grunt) {

  var getProxyConfig = function () {
    return [
      {
        context: ['/rest'],
        host: 'localhost',
        port: 8080
      }
    ];
  };

  var configureMiddlewares = function (connect, options) {
    if (!Array.isArray(options.base)) {
      options.base = [options.base];
    }

    var middlewares = [];

    middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
    middlewares.push(require('grunt-connect-rewrite/lib/utils').rewriteRequest);

    // Serve static files.
    options.base.forEach(function (base) {
      middlewares.push(connect.static(base));
    });

    // Make directory browse-able.
    var directory = options.directory || options.base[options.base.length - 1];
    middlewares.push(connect.directory(directory));

    return middlewares;
  };

  return {
    middlewares: configureMiddlewares,
    proxies: getProxyConfig()
  };

};