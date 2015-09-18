import { black } from './home.css';

export default class HomeCtrl {
    constructor($scope) {
        $scope.buttonContent = 'THIS IS A STUPID TEST';
        $scope.style = black;
    }
}
