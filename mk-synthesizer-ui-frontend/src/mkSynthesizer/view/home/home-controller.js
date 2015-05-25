'use strict';
angular.module('mkSynthesizer.view')

/**
 * Configures the route for the valuations overview.
 */
  .config(function ($stateProvider, MK_SYNTHESIZER_STATES) {
    $stateProvider.state(MK_SYNTHESIZER_STATES.HOME, {
      url: '/home',
      templateUrl: 'mkSynthesizer/view/home/home-controller.tpl.html',
      controller: 'HomeController',
      resolve: {
        voices: function (maryttsService) {
          return maryttsService.getVoices();
        }
      }
    });
  })

  .controller('HomeController', function ($scope, synthesizerService, voices, $sce) {
    $scope.voices = voices;

    $scope.synthesizeText = function () {
      synthesizerService.synthesizeText($scope.inputText, $scope.selectedVoice).then(function (path) {
          $scope.file = {
            path: $sce.trustAsResourceUrl(path)
          };
        }
      )
      ;
    };
  })
;
