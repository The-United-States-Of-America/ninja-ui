const namespace = 'ninja.ui';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';

import uiHome from './home';

angular.module(namespace, [
    ngAnimate,
    ngMaterial,
    uiRouter,
    uiHome
])

.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('home');
})

.config(function($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider
        .theme('ninja')
        .primaryPalette('teal')
        .accentPalette('deep-purple');

    $mdThemingProvider.setDefaultTheme('ninja');

    $mdIconProvider.defaultFontSet('fa');
});


export default namespace;
