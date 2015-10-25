export default class uiCtrl {
    constructor($scope, $state, $mdMedia) {
        this.$state = $state;
        this.$scope = $scope;
        this.$scope.email = 'delanr3@rpi.edu';

        this.$scope.goToSettings = this.goToSettings.bind(this);
        this.$scope.goToAppointments = this.goToAppointments.bind(this);
        this.$scope.goToMessages = this.goToMessages.bind(this);
        this.$scope.goToFamily = this.goToFamily.bind(this);
        this.$scope.toggleSidebar = this.toggleSidebar.bind(this);

        this.$scope.sidebarLockedOpen = $mdMedia('gt-md');
        this.$scope.sidebarOpen = this.$scope.sidebarLockedOpen;
        // this.$scope.user = {
        //     email: 'delanr3@rpi.edu'
        // };
    }

    goToAppointments() {
        // this.$state.go('appointments');
        console.log('Going to appointments...');
    }

    goToFamily() {
        // this.$state.go('family');
        console.log('Going to family..');
    }

    goToSettings() {
        // this.$state.go('appointments');
        console.log('Going to settings...');
    }

    goToMessages() {
        // this.$state.go('messages');
        console.log('Going to messages...');
    }

    toggleSidebar() {
        this.$scope.sidebarOpen = !this.$scope.sidebarOpen;
    }
}
