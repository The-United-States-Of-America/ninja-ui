import styles from './dash.css';

export default class DashCtrl {
    constructor($scope) {
        $scope.buttonContent = 'THIS IS A bug TEST';

        $scope.green  = styles.green;
    }
}
