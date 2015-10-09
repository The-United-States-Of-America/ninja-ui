const namespace = 'ninja.ui.dash';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material'
import DashCtrl from './DashCtrl';
import DashTemplate from './dash.html';
import PatientSidebar from './patientSidebar.html';

angular.module(namespace, [
    uiRouter,
    ngAnimate,
    ngMaterial
])

.config(function($stateProvider) {
    $stateProvider.state('ui.dash', {
        url: '/dash',
        views: {
            sidebar: {
                template: '<ui-view name="sidebar"></ui-view>'
            },
            content: {
                template: DashTemplate,
                controller: DashCtrl,
                abstract: true
            }
        }
    })
    .state('ui.dash.patient', {
        url: '/patient',
        views: {
            sidebar: {
                template: PatientSidebar
            },
            dashboard: {
                template: '<h1>Patient Dashboard</h1>'
            }
        }
    });
});