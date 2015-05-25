'use strict';

angular.module('mkSynthesizer.service')
  .factory('maryttsService', function ($http) {

    var VOICES_ENDPOINT = '/voices';

    var getVoices = function () {
      return $http.get(VOICES_ENDPOINT).then(function (voices) {
        var voicesData = voices.data.split('\n');
        var voiceNames = [];
        angular.forEach(voicesData, function (voiceData) {
          if (voiceData !== '') {
            voiceNames.push(voiceData.split(' ')[0]);
          }
        });
        return voiceNames;
      });
    };

    return {
      getVoices: getVoices
    };
  });