const namespace = 'ninja.ui';
export default namespace;
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterialStyles from 'angular-material/angular-material.css';
import ngMaterial from 'angular-material';
import uiDash from './dash';

import './ui.css';

angular.module(namespace, [
    ngAnimate,
    ngMaterial,
    uiRouter,
    uiDash
])

.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('dash');
})

.config(function($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider
        .theme('ninja')
        .primaryPalette('blue-grey')
        .accentPalette('deep-orange');

    $mdThemingProvider.setDefaultTheme('ninja');

    $mdIconProvider
});
