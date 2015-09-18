const namespace = 'ninja';
import angular from 'angular';
import ninjaUI from './ui';
import ninjaCore from './core';

angular.module(namespace, [
    ninjaUI,
    ninjaCore
]);

export default namespace;
