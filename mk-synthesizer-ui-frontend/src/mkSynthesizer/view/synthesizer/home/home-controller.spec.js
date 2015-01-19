'use strict';

describe('HomeController', function () {

  var $controller, $scope;
  var synthesizerService;
  var createController;

  beforeEach(function () {
    module('mkSynthesizer.view.synthesizer');
    module('mkSynthesizer.service.synthesizer');
  });

  beforeEach(inject(function (_$controller_, _$rootScope_, _synthesizerService_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    synthesizerService = _synthesizerService_;
  }));

  beforeEach(function () {
    createController = function () {
      return $controller('HomeController', {
        $scope: $scope,
        synthesizerService: synthesizerService,
        voices: []
      });
    };
  });

  it('should initialize controller', function () {
    // given & when
    // TODO: write tests

    // then
  });

});