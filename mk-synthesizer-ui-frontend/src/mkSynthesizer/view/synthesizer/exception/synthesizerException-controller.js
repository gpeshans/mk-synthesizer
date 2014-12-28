'use strict';

angular.module('mkSynthesizer.view.synthesizer')

  .config(function ($stateProvider, MK_SYNTHESIZER_STATES) {
    $stateProvider.state(MK_SYNTHESIZER_STATES.SYNTHESIZER_EXCEPTION, {
      url: '/synthesizer-error',
      templateUrl: 'mkSynthesizer/view/synthesizer/exception/synthesizerException-controller.tpl.html',
      controller: 'SynthesizerExceptionController'
    });
  })

  .controller('SynthesizerExceptionController', function () {});
