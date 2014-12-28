'use strict';

window.deferredBootstrapper.bootstrap({
  element: window.document.body,
  module: 'mkSynthesizer',
  resolve: {
    CONTEXT:  /* @ngInject */ function ($q) {
      var deferred = $q.defer();
      deferred.resolve('test');
      return deferred.promise;
    }
  }
});