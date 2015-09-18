import styles from './home.css';

export default class HomeCtrl {
    constructor($scope) {
        $scope.buttonContent = 'THIS IS A bug TEST';
        $scope.style = styles.black;
    }
}
