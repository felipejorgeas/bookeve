var AppController = function ($rootScope, $scope, $location, AuthenticationService) {
    $rootScope.showMyAccount = false;
    $rootScope.usuario = null;
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
                $rootScope.usuario = false;
                $rootScope.loadPage('/login');
            }
        }
    }
    $scope.cadastrarResponse = function (result) {
        if (result.ok) {
            $rootScope.usuario = result.usuario;
            $rootScope.loadPage('/painel');
        } else {
            alert('Não foi possível realizar o seu cadastro no momento. Por favor tente mais tarde.');
        }
    }
    $scope.logarResponse = function (result) {
        if (result.ok) {
            $rootScope.usuario = result.usuario;
            $rootScope.loadPage('/painel');
        } else {
            alert('Usuário não cadastrado!');
        }
    }
    $scope.init = function () {
        if (AuthenticationService.isAuthenticated()) {
            $rootScope.usuario = AuthenticationService.getUserAuthenticated();
        }
    }
    $scope.init();
    return $scope;
}
AppController.$inject = ['$rootScope', '$scope', '$location', 'AuthenticationService'];