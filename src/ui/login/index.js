const namespace = 'ninja.ui.login';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import LoginCtrl from './LoginCtrl';
import LoginTemplate from './login.html';
import './login.css';


angular.module(namespace, [
    uiRouter,
    ngAnimate,
    ngMaterial
])

.config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        template: LoginTemplate,
        controller: LoginCtrl
    });
})

.controller(namespace, function($scope) {
  $scope.authenticate = function() {

  }
});
