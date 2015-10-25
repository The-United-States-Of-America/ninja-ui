const namespace = 'ninja.ui';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterialStyles from 'angular-material/angular-material.css';
import ngMaterial from 'angular-material';
import gravatar from 'angular-gravatar';
import uiDash from './dash';
import uiLogin from './login';
import uiRegistration from './registration';
import uiCtrl from './uiCtrl';
import uiTemplate from './ui.html';

import './ui.css';

angular.module(namespace, [
    ngAnimate,
    ngMaterial,
    'ui.gravatar',
    uiRouter,
    uiDash,
    uiLogin,
    uiRegistration
])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('ui', {
        url: '',
        template: uiTemplate,
        controller: uiCtrl,
        abstract: true
    });

    $urlRouterProvider.otherwise('dash');
})

.config(function($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider
        .theme('ninja')
        .primaryPalette('blue-grey')
        .accentPalette('deep-orange');

    $mdThemingProvider.setDefaultTheme('ninja');

    $mdIconProvider.defaultIconSet('/icons/icons.svg')
});
