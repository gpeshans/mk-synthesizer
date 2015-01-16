'use strict';
angular.module('mkSynthesizer.view.synthesizer')

/**
 * Configures the route for the valuations overview.
 */
  .config(function ($stateProvider, MK_SYNTHESIZER_STATES) {
    $stateProvider.state(MK_SYNTHESIZER_STATES.SYNTHESIZER_HOME, {
      url: '/home',
      templateUrl: 'mkSynthesizer/view/synthesizer/home/home-controller.tpl.html',
      controller: 'HomeController'
    });
  })

  .controller('HomeController', function ($scope, testService) {
    $scope.test = 'mkSynthesizer';
    $scope.resetModel = function () {
      $scope.test = '';
    };

    $scope.testPost = function () {
      testService.testSynthesizePOST().then(function (path) {
        $scope.file = {
          path: 'http://localhost:9000/rest/resources/wav/temp.wav'
        };
      });
    };
  });
