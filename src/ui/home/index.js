const namespace = 'ninja.ui.home';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import HomeCtrl from './HomeCtrl';

angular.module(namespace, [
    uiRouter
])

.controller('HomeCtrl', HomeCtrl)

.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        template: '<p>{{ test }}</p>',
        controller: 'HomeCtrl'
    });
});
