const namespace = 'ninja.ui.registration';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import RegistrationCtrl from './RegistrationCtrl';
import RegistrationTemplate from './registration.html';

angular.module(namespace, [
    uiRouter,
    ngAnimate,
    ngMaterial
])

.config(function($stateProvider) {
    $stateProvider.state('registration', {
        url: '/registration',
        template: RegistrationTemplate,
        controller: RegistrationCtrl
    });
})
