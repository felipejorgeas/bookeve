angular.module('bookeve', ['ngRoute']);
angular.module('bookeve').config(function ($routeProvider) {
    var accessRestrict = {
        load: function ($q, AuthenticationService) {
            var defer = $q.defer();
            if (!AuthenticationService.isAuthenticated()) {
                defer.reject("not_logged_in");
            } else {
                defer.resolve();
            }
            return defer.promise;
        }
    };
    $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController as home',
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'PainelController as painel',
            })
            .when('/painel', {
                templateUrl: 'views/painel.html',
                controller: 'PainelController as painel',
                resolve: accessRestrict
            })
            .when('/painel/eventos', {
                templateUrl: 'views/painel-eventos.html',
                controller: 'EventosController as eventos',
                resolve: accessRestrict
            })
            .otherwise('/');
});
angular.module('bookeve').factory('AuthenticationService', AuthenticationService);
angular.module('bookeve').controller('AppController', AppController);
angular.module('bookeve').controller('HomeController', HomeController);
angular.module('bookeve').controller('PainelController', PainelController);
