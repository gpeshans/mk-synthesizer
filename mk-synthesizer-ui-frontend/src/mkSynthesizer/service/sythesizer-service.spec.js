'use strict';

describe('synthesizerService', function () {

  var $rootScope, $httpBackend;
  var synthesizerService;
  var fileLocation, fileLocationResponseData;

  beforeEach(function () {
    module('mkSynthesizer.service');
  });

  beforeEach(inject(function (_$rootScope_, _synthesizerService_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    synthesizerService = _synthesizerService_;
    $httpBackend = _$httpBackend_;
  }));

  var flushAndApply = function () {
    $httpBackend.flush();
    $rootScope.$apply();
  };

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should synthesize the text and return location of the audio file', function () {
    // given
    fileLocationResponseData = '/resources/wav/recording.wav';
    $httpBackend.expect('POST', '/rest/synthesizer/synthesize?' +
      'inputText=input+text&' +
      'inputType=TEXT&' +
      'selectedVoice=selected+voice').respond(200, fileLocationResponseData);

    // when
    synthesizerService.synthesizeText('input text', 'selected voice').then(function (data) {
      fileLocation = data;
    });
    flushAndApply();

    // then
    expect(fileLocation).toBe('/rest/resources/wav/recording.wav');
  });

});