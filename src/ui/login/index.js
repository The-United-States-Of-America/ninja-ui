const namespace = 'ninja.ui.login';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';

import LoginCtrl from './LoginCtrl';
import LoginTemplate from './login.html';



angular.module(namespace, [
    uiRouter,
    ngAnimate,
    ngMaterial
])

.config(function($stateProvider) {
    $stateProvider.state('ui.login', {
        url: '/login',
        template: LoginTemplate,
        controller: LoginCtrl
    });
})

.service('authService', function() {
  return {
    loggedIn: function() {
      return $window.sessionStorage.user;
    },

    login: function(email, pass) {
      var dataPromise, messageData;
      dataPromise = $q.defer();
      messageData = {
        email: email,
        password: pass
      };

      $http({
        url: 'localhost:8001/client/login',
        method: 'POST',
        data: JSON.stringify(messageData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $window.sessionStorage.user = data.user;
        return dataPromise.resolve(data);
      }).error(function(data, status, headers, config) {
        $window.sessionStorage.removeItem('token');
        $window.sessionStorage.removeItem('user');
        return dataPromise.reject(data.m);
      });
      return dataPromise.promise;
    }
  }
});
