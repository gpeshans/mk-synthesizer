'use strict';

angular.module('mkSynthesizer.service')

  .factory('synthesizerService', function ($http) {

    var REST_BASE_URL = '/rest';
    var SYNTHESIZE_ENDPOINT = '/synthesizer/synthesize';

    var synthesizeText = function (inputText, selectedVoice) {
      var synthesizerData = {
        'inputText': inputText,
        'selectedVoice': selectedVoice,
        'inputType': 'TEXT'
      };

      return $http.post(REST_BASE_URL + SYNTHESIZE_ENDPOINT, synthesizerData).then(function (response) {
        var recordingLocation = response.data;
        return REST_BASE_URL + recordingLocation;
      });
    };

    return {
      synthesizeText: synthesizeText
    };

  });