angular.module('bookeve', ['ngRoute']);
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
                controller: 'HomeController as home'
            })
            .when('/cadastro', {
                templateUrl: 'views/cadastro.html',
                controller: 'PainelController as painel'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'PainelController as painel'
            })
            .when('/painel', {
                templateUrl: 'views/painel.html',
                controller: 'PainelController as painel',
                resolve: accessRestrict
            })
            .when('/painel/eventos', {
                templateUrl: 'views/painel-eventos.html',
                controller: 'EventoController',
                resolve: accessRestrict
            })
            .when('/painel/usuarios', {
                templateUrl: 'views/painel-usuarios.html',
                controller: 'UsuarioController as usuario',
                resolve: accessRestrictAdmin
            })
            .otherwise('/');
});
angular.module('bookeve').factory('AuthenticationService', AuthenticationService);
angular.module('bookeve').factory('BookEveAPIService', BookEveAPIService);
angular.module('bookeve').controller('AppController', AppController);
angular.module('bookeve').controller('HomeController', HomeController);
angular.module('bookeve').controller('PainelController', PainelController);
angular.module('bookeve').controller('EventoController', EventoController);
angular.module('bookeve').controller('UsuarioController', UsuarioController);
