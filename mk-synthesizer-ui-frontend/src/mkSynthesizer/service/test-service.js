'use strict';

angular.module('mkSynthesizer.service.synthesizer')
  .factory('testService', function ($http) {

    var testSynthesizePOST = function () {
      var params = {
        inputText: 'Hello how are you?',
        selectedVoice: 'cmu-slt-hsmm',
        inputType: 'TEXT'
      };
      return $http.post('/rest/synthesizer/synthesize', {}, {
          params: params
        }
      );
    };

    return {
      testSynthesizePOST: testSynthesizePOST
    };

  });