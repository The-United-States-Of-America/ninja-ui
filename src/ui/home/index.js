const namespace = 'ninja.ui.home';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material'
import HomeCtrl from './HomeCtrl';
import HomeTemplate from './home.html';

angular.module(namespace, [
    uiRouter,
    ngAnimate,
    ngMaterial
])

.controller('HomeCtrl', HomeCtrl)

.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        template: HomeTemplate,
        controller: 'HomeCtrl'
    });
});
