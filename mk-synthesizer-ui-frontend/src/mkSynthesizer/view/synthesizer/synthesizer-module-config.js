'use strict';

angular.module('mkSynthesizer.view.synthesizer')

  .config(function ($stateProvider, MK_SYNTHESIZER_STATES) {
    $stateProvider.state(MK_SYNTHESIZER_STATES.SYNTHESIZER, {
      abstract: true,
      url: '/synthesizer',
      templateUrl: 'mkSynthesizer/view/synthesizer/synthesizer.tpl.html',
      controller: 'SynthesizerController'
    });
  })

  .controller('SynthesizerController', function () {});