'use strict';

angular.module('mkSynthesizer.service.synthesizer')
  .factory('synthesizerService', function ($http) {

    var synthesizeText = function (inputText, selectedVoice) {
      var params = {
        inputText: inputText,
        selectedVoice: selectedVoice,
        inputType: 'TEXT'
      };
      return $http.post('/rest/synthesizer/synthesize', {}, {
          params: params
        }
      ).then(function () {
          return '/rest/resources/wav/temp.wav';
        });
    };

    return {
      synthesizeText: synthesizeText
    };

  });