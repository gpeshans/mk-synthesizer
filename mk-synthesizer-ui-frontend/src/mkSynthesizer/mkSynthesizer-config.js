'use strict';

angular.module('mkSynthesizer')

  .config(function ($urlRouterProvider) {
    $urlRouterProvider.when('', '/home');
    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.otherwise('/synthesizer-error');
  });