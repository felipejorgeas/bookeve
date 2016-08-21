var PainelController = function ($rootScope, $location, AuthenticationService) {
    this.eventos = [];
    this.menu = [
        {
            title: 'Home',
            active: false,
            accessLevel: [],
            action: function () {
                $rootScope.loadPage('/painel');
            }
        },
        {
            title: 'Eventos',
            active: false,
            accessLevel: [],
            action: function () {
                $rootScope.loadPage('/painel/eventos');
            }
        },
        {
            title: 'Conteúdos',
            active: false,
            accessLevel: ['administrador', 'organizador'],
            action: function () {
                $rootScope.loadPage('/painel/conteudos');
            }
        },
        {
            title: 'Usuários',
            active: false,
            accessLevel: ['administrador', 'organizador'],
            action: function () {
                $rootScope.loadPage('/painel/usuarios');
            }
        }
    ];
    this.getInternalPage = function (page) {
        page = page.replace('/painel', '');
        if (page.indexOf('/') !== false) {
            var aux = page.split('/');
            page = aux[1];
        }
        return page;
    };
    this.setMenu = function (page) {
        var internalPage = this.getInternalPage(page);
        var accessLevel = AuthenticationService.getUserAuthenticated().accessLevel;
        this.menu = this.menu.filter(function (item) {
            var result = true;
            if (item.accessLevel.length > 0) {
                item.accessLevel = item.accessLevel.filter(function (level) {
                    return level === accessLevel;
                });
                return item.accessLevel.length > 0;
            }
            return result;
        });
        this.menu.map(function (item) {
            item.active = false;
            switch (internalPage) {
                case 'painel':
                    if (item.title === 'Home') {
                        item.active = true;
                    }
                    break;
                case 'eventos':
                    if (item.title === 'Eventos') {
                        item.active = true;
                    }
                    break;
                case 'conteudos':
                    if (item.title === 'Conteúdos') {
                        item.active = true;
                    }
                    break;
                case 'usuarios':
                    if (item.title === 'Usuários') {
                        item.active = true;
                    }
                    break;
                default:
                    if (item.title === 'Home') {
                        item.active = true;
                    }
            }
            return item;
        });
    };
    this.init = function () {
        var page = $location.path();
        this.setMenu(page);
    };
    this.init();
}
PainelController.$inject = ['$rootScope', '$location', 'AuthenticationService'];