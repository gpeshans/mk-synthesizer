'use strict';

angular.module('mkSynthesizer.view')

  .config(function ($stateProvider, MK_SYNTHESIZER_STATES) {
    $stateProvider.state(MK_SYNTHESIZER_STATES.VIEW, {
      abstract: true,
      url: '/view',
      template: '<div ui-view></div>'
    });
  });