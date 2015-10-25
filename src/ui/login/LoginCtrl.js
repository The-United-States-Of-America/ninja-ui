export default class LoginCtrl {
  constructor($scope) {
      this.$scope = $scope;
      this.$state = $state;

      this.$scope.user = {
        error: false,
        error_message: ''
      };

      this.$scope.login = this.login.bind(this);
  }

  login() {
    return AuthService.login($scope.user.email, $scope.user.password).then(function(user_data) {
        //Success, user object returned. Go to patient page for now.
        $state.go('ui.dash.patient');
      }, function(err) {
        $scope.user.error = true;
        return $scope.user.error_message = err;
      });
  };
}
