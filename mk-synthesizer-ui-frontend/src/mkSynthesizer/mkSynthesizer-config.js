'use strict';

angular.module('mkSynthesizer')

  .config(function ($urlRouterProvider) {
    $urlRouterProvider.when('', '/view/synthesizer/home');
    $urlRouterProvider.when('/', '/view/synthesizer/home');
    $urlRouterProvider.otherwise('/synthesizer-error');
  });