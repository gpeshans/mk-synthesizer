'use strict';

angular.module('mkSynthesizer.view.common', [])

  .constant('MK_SYNTHESIZER_STATES', {
    SYNTHESIZER_EXCEPTION: 'exception',
    VIEW: 'view',
    SYNTHESIZER: 'view.synthesizer',
    SYNTHESIZER_HOME: 'view.synthesizer.home'
  });