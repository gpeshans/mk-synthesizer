'use strict';

describe('maryttsService', function () {

  var $rootScope, $httpBackend;
  var maryttsService;
  var voicesResponseData, voiceNames;

  beforeEach(function () {
    module('mkSynthesizer.service');
  });

  beforeEach(inject(function (_$rootScope_, _maryttsService_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    maryttsService = _maryttsService_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(function () {
    voicesResponseData = 'cmu-slt-hsmm en_US female hmm\n' +
                         'mk_voice mk male hmm ';
  });

  var flushAndApply = function () {
    $httpBackend.flush();
    $rootScope.$apply();
  };

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get the available voices', function () {
    // given
    $httpBackend.expect('GET', '/voices').respond(200, voicesResponseData);

    // when
    maryttsService.getVoices().then(function (data) {
      voiceNames = data;
    });
    flushAndApply();

    // then
    expect(voiceNames.length).toBe(2);
    expect(voiceNames[0]).toBe('cmu-slt-hsmm');
    expect(voiceNames[1]).toBe('mk_voice');
  });

});