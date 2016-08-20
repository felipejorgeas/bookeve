var AppController = function ($rootScope, $scope, $location, AuthenticationService) {
    $scope.$on("$routeChangeError", function (evt, current, previous, rejection) {
        if (rejection == "not_logged_in") {
            $scope.loadPage('/login');
        }
    });
    $rootScope.loadPage = function (page) {
        $location.path(page);
    }
    $rootScope.logar = function () {
        if (AuthenticationService.auth()) {
            $rootScope.loadPage('/painel');
        }
    }
    $rootScope.logout = function () {
        if (AuthenticationService.logout()) {
            $rootScope.loadPage('/login');
        }
    }
    return $scope;
}
AppController.$inject = ['$rootScope', '$scope', '$location', 'AuthenticationService'];