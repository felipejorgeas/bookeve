var PainelController = function ($rootScope, $location, AuthenticationService) {
    var self = this;
    self.eventos = [];
    self.menu = [
        {
            title: 'Eventos',
            active: false,
            accessLevel: [],
            action: function () {
                $rootScope.loadPage('/painel/eventos');
            }
        },
        {
            title: 'Usuários',
            active: false,
            accessLevel: ['administrador'],
            action: function () {
                $rootScope.loadPage('/painel/usuarios');
            }
        }
    ];
    self.getInternalPage = function (page) {
        page = page.replace('/painel', '');
        if (page.indexOf('/') !== false) {
            var aux = page.split('/');
            page = aux[1];
        }
        return page;
    };
    self.setMenu = function (page) {
        var internalPage = self.getInternalPage(page);
        var accessLevel = AuthenticationService.getUserAuthenticated().accessLevel;
        self.menu = self.menu.filter(function (item) {
            var result = true;
            if (item.accessLevel.length > 0) {
                item.accessLevel = item.accessLevel.filter(function (level) {
                    return level === accessLevel;
                });
                return item.accessLevel.length > 0;
            }
            return result;
        });
        self.menu.map(function (item) {
            item.active = false;
            switch (internalPage) {
                case 'usuarios':
                    if (item.title === 'Usuários') {
                        item.active = true;
                    }
                    break;
                default:
                    if (item.title === 'Eventos') {
                        item.active = true;
                    }
            }
            return item;
        });
    };
    self.init = function () {
        var page = $location.path();
        self.setMenu(page);
    };
    self.init();
}
PainelController.$inject = ['$rootScope', '$location', 'AuthenticationService'];
angular.module('bookeve').controller('PainelController', PainelController);