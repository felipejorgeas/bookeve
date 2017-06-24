var AppController = function ($rootScope, $scope, $location, AuthenticationService) {
    $rootScope.showMyAccount = false;
    $rootScope.usuarioLogado = null;
    $scope.$on("$routeChangeSuccess", function (evt, current, previous, rejection) {
        $rootScope.showMyAccount = ($location.path() !== '/login' && $location.path() !== '/cadastro');
    });
    $scope.$on("$routeChangeError", function (evt, current, previous, rejection) {
        if (rejection == "not_logged_in") {
            $scope.loadPage('/login');
        } else if (rejection == "no_access") {
            alert("Acesso negado");
        }
    });
    $rootScope.loadPage = function (page) {
        $location.path(page);
    }
    $rootScope.cadastrar = function (user) {
        if (!user || !user.nome || !user.email || !user.senha) {
            alert("Favor preencher os dados de acesso corretamente!");
        } else {
            AuthenticationService.register(user, $scope.cadastrarResponse);
        }
    }
    $rootScope.logar = function (user) {
        if (!user || !user.email || !user.senha) {
            alert("Favor preencher os dados de acesso corretamente!");
        } else {
            AuthenticationService.auth(user, $scope.logarResponse);
        }
    }
    $rootScope.logout = function () {
        if (confirm('Deseja sair da sua conta?')) {
            if (AuthenticationService.logout()) {
                $rootScope.usuarioLogado = false;
                $rootScope.loadPage('/login');
            }
        }
    }
    $scope.cadastrarResponse = function (result) {
        if (result.ok) {
            $rootScope.usuarioLogado = result.data;
            var eventId = sessionStorage.getItem('redirectEvent');
            sessionStorage.removeItem('redirectEvent');
            if (eventId) {
                $rootScope.loadPage('/evento/' + eventId);
            } else {
                $rootScope.loadPage('/painel');
            }
        } else {
            alert(result.message);
        }
    }
    $scope.logarResponse = function (result) {
        if (result.ok) {
            $rootScope.usuarioLogado = result.data;
            var eventId = sessionStorage.getItem('redirectEvent');
            sessionStorage.removeItem('redirectEvent');
            if (eventId) {
                $rootScope.loadPage('/evento/' + eventId);
            } else {
                $rootScope.loadPage('/painel');
            }
        } else {
            alert(result.message);
        }
    }
    $scope.init = function () {
        if (AuthenticationService.isAuthenticated()) {
            $rootScope.usuarioLogado = AuthenticationService.getUserAuthenticated();
        }
    }
    $scope.init();
    return $scope;
}
AppController.$inject = ['$rootScope', '$scope', '$location', 'AuthenticationService'];
angular.module('bookeve').controller('AppController', AppController);