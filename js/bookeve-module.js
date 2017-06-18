angular.module('bookeve', ['ngRoute', 'youtube-embed']);
angular.module('bookeve').config(function ($routeProvider) {
    var accessRestrict = {
        verify1: function ($q, AuthenticationService) {
            var defer = $q.defer();
            if (!AuthenticationService.isAuthenticated()) {
                defer.reject("not_logged_in");
            } else {
                defer.resolve();
            }
            return defer.promise;
        }
    };
    var accessRestrictAdmin = {
        verify1: accessRestrict.verify1,
        verify2: function ($q, AuthenticationService) {
            var defer = $q.defer();
            if (!AuthenticationService.isAccessLevel('administrador')) {
                defer.reject("no_access");
            } else {
                defer.resolve();
            }
            return defer.promise;
        }
    };
    $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController as homeCtrl'
            })
            .when('/evento/:id', {
                templateUrl: 'views/evento-view.html',
                controller: 'EventoController as eventoCtrl',
            })
            .when('/cadastro', {
                templateUrl: 'views/cadastro.html',
            })
            .when('/login', {
                templateUrl: 'views/login.html',
            })
            .when('/painel', {
                templateUrl: 'views/painel.html',
                resolve: accessRestrict
            })
            .when('/painel/eventos', {
                templateUrl: 'views/painel-eventos.html',
                controller: 'EventoController as eventoCtrl',
                resolve: accessRestrict
            })
            .when('/painel/eventos/:id', {
                templateUrl: 'views/painel-eventos-edit.html',
                controller: 'EventoController as eventoCtrl',
                resolve: accessRestrict
            })
            .when('/painel/usuarios', {
                templateUrl: 'views/painel-usuarios.html',
                controller: 'UsuarioController as usuarioCtrl',
                resolve: accessRestrictAdmin
            })
            .when('/painel/usuarios/:id', {
                templateUrl: 'views/painel-usuarios-edit.html',
                controller: 'UsuarioController as usuarioCtrl',
                resolve: accessRestrict
            })
            .otherwise('/');
});
