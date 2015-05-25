'use strict';

describe('HomeController', function () {

  var $controller, $scope;
  var createController, controller;
  var synthesizerService, synthesizerUtil;
  var voices;

  beforeEach(function () {
    module('mkSynthesizer.view');
    module('mkSynthesizer.service');
  });

  beforeEach(inject(function (_$controller_, _$rootScope_, _synthesizerService_, _synthesizerUtil_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    synthesizerService = _synthesizerService_;
    synthesizerUtil = _synthesizerUtil_;
  }));

  beforeEach(function () {
    voices = ['mk-voice', 'en-voice'];

    createController = function () {
      controller = $controller('HomeController', {
        $scope: $scope,
        synthesizerService: synthesizerService,
        voices: voices
      });
    };
  });

  it('should initialize the controller properly', function () {
    // given & when
    createController();

    // then
    expect($scope.voices).toBe(voices);
  });

  it('should synthesize the entered text and set the url for downloading', function () {
    // given
    var synthesizedFilePromise = synthesizerUtil.resolvePromiseWith('/recording.wav');
    spyOn(synthesizerService, 'synthesizeText').and.returnValue(synthesizedFilePromise);
    createController();

    $scope.inputText = 'test';
    $scope.selectedVoice = 'mk-voice';

    // when
    $scope.synthesizeText();
    $scope.$digest();

    // then
    expect(synthesizerService.synthesizeText).toHaveBeenCalledWith('test', 'mk-voice');
    expect($scope.file.path.$$unwrapTrustedValue()).toBe('/recording.wav');
  });

});