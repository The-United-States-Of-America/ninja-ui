const namespace = 'ninja.ui.dash';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import jQuery from 'jquery';
import 'clndr';
import DashCtrl from './DashCtrl';
import DashTemplate from './dash.html';
import patientSidebar from './patientSidebar.html';
import patientDash from './patientDash.html';
import doctorSidebar from './doctorSidebar.html';

angular.module(namespace, [
    uiRouter,
    ngAnimate,
    ngMaterial
])

.directive('clndrSettings', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            jQuery(element).clndr(scope.$eval(attrs.toolbarTip));
        }
    };
})

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
                template: patientSidebar
            },
            dashboard: {
                template: patientDash
            }
        }
    })
    .state('ui.dash.doctor', {
        url: '/doctor',
        views: {
            sidebar: {
                template: doctorSidebar
            },
            dashboard: {
                template: "<h1>I'm a doctor</h1>"
            }
        }
    })
});
