import angular from 'angular';
import test from './test';


angular.module('ninja', [])
.controller('home', function($scope) {
    $scope.test = test.name;
});
