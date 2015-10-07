const namespace = 'ninja.ui.login';
export default namespace;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import LoginTemplate from './login.html';

angular.module("LoginApp", [
    uiRouter,
    ngAnimate,
    ngMaterial
]);


