'use strict';

angular.module('mkSynthesizer.service')
  .factory('maryttsService', function ($http) {

    var REST_BASE_URL = '/rest';
    var VOICES_ENDPOINT = '/synthesizer/voices';

    var getVoices = function () {
      return $http.get(REST_BASE_URL + VOICES_ENDPOINT).then(function (response) {
        return response.data;
      });
    };

    return {
      getVoices: getVoices
    };
  });