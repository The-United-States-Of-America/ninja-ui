const namespace = 'ninja';
export default namespace;
console.log('loading')
import angular from 'angular';
import ninjaUI from './ui';
import ninjaCore from './core';

angular.module(namespace, [
    ninjaUI,
    ninjaCore
]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [namespace]);
});
