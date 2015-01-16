'use strict';

describe('HomeController', function () {

  var $controller, $scope;
  var testService;
  var createController;

  beforeEach(function () {
    module('mkSynthesizer.view.synthesizer');
    module('mkSynthesizer.service.synthesizer');
  });

  beforeEach(inject(function (_$controller_, _$rootScope_, _testService_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    testService = _testService_;
  }));

  beforeEach(function () {
    createController = function () {
      return $controller('HomeController', {
        $scope: $scope,
        testService: testService
      });
    };
  });

  it('should initialize controller', function () {
    // given & when
    createController();

    // then
    expect($scope.test).toBe('mkSynthesizer');
  });

  it('should reset the test model', function () {
    // given
    createController();

    // when
    $scope.resetModel();

    // then
    expect($scope.test).toBe('');
  });

});