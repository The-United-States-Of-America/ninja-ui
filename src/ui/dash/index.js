const namespace = 'ninja.ui.dash';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material'
import DashCtrl from './DashCtrl';
import DashTemplate from './dash.html';
import patientSidebar from './patientSidebar.html';

angular.module(namespace, [
    uiRouter,
    ngAnimate,
    ngMaterial
])

.config(function($stateProvider) {
    $stateProvider.state('dash', {
        url: '/dash',
        template: DashTemplate,
        controller: DashCtrl,
        abstract: true
    })
    .state('dash.patient', {
        url: '/patient',
        views: {
            sidebar: {
                template: patientSidebar
            },
            dashboard: {
                template: '<h1>HEYYYY</h1>'
            }
        }
    });
});
