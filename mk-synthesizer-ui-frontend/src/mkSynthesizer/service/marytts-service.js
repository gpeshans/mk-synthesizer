'use strict';

angular.module('mkSynthesizer.service.synthesizer')
  .factory('maryttsService', function ($http) {

    var getVoices = function () {
      return $http.get('/voices').then(function (voices) {
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