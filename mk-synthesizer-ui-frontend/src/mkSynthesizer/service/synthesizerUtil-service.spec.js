'use strict';

describe('synthesizerUtil', function () {

  var $rootScope, $q;
  var synthesizerUtil;

  beforeEach(function () {
    module('mkSynthesizer.service');
  });

  beforeEach(inject(function (_$rootScope_, _$q_, _synthesizerUtil_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    synthesizerUtil = _synthesizerUtil_;
  }));

  describe('resolvePromiseWith', function () {

    it('should return a resolved promise', function () {
      // given
      var successCallback = jasmine.createSpy('successCallback');
      var errorCallback = jasmine.createSpy('errorCallback');

      // when
      synthesizerUtil.resolvePromiseWith().then(successCallback, errorCallback);
      $rootScope.$digest();

      // then
      expect(successCallback).toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
    });

    it('should pass resolved data to success callback', function () {
      // given
      var successCallback = jasmine.createSpy('successCallback');
      var errorCallback = jasmine.createSpy('errorCallback');
      var resolvedData = {
        some: 'object'
      };

      // when
      synthesizerUtil.resolvePromiseWith(resolvedData).then(successCallback, errorCallback);
      $rootScope.$digest();

      // then
      expect(successCallback).toHaveBeenCalledWith(resolvedData);
      expect(errorCallback).not.toHaveBeenCalled();
    });

  });

  describe('rejectPromiseWith', function () {

    it('should return a rejected promise', function () {
      // given
      var successCallback = jasmine.createSpy('successCallback');
      var errorCallback = jasmine.createSpy('errorCallback');

      // when
      synthesizerUtil.rejectPromiseWith().then(successCallback, errorCallback);
      $rootScope.$digest();

      // then
      expect(errorCallback).toHaveBeenCalled();
      expect(successCallback).not.toHaveBeenCalled();
    });


    it('should pass rejection to error callback', function () {
      // given
      var successCallback = jasmine.createSpy('successCallback');
      var errorCallback = jasmine.createSpy('errorCallback');
      var rejection = {
        some: 'object'
      };

      // when
      synthesizerUtil.rejectPromiseWith(rejection).then(successCallback, errorCallback);
      $rootScope.$digest();

      // then
      expect(errorCallback).toHaveBeenCalledWith(rejection);
      expect(successCallback).not.toHaveBeenCalled();
    });

  });

});

