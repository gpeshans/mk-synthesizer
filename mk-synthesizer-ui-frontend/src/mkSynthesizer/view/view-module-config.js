'use strict';

angular.module('mkSynthesizer.view')

  .constant('MK_SYNTHESIZER_STATES', {
    VIEW: 'view',
    HOME: 'view.home'
  })

  .config(function ($stateProvider, MK_SYNTHESIZER_STATES) {
    $stateProvider.state(MK_SYNTHESIZER_STATES.VIEW, {
      abstract: true,
      url: '',
      template: '<div ui-view></div>'
    });
  });