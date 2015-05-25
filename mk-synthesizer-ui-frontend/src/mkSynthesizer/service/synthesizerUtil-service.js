'use strict';

angular.module('mkSynthesizer.service')

  .factory('synthesizerUtil', function ($q) {

    /**
     * Returns resolved promise with the passed data.
     * @param data the data ro be resolved
     * @returns {*} resolved promise
     */
    var resolvePromiseWith = function (data) {
      var deferred = $q.defer();
      deferred.resolve(data);
      return deferred.promise;
    };

    /**
     * Returns rejected promise.
     * @returns {*}rejected promise
     */
    var rejectPromiseWith = function (reason) {
      var deferred = $q.defer();
      deferred.reject(reason);
      return deferred.promise;
    };

    return {
      resolvePromiseWith: resolvePromiseWith,
      rejectPromiseWith: rejectPromiseWith
    };
  });