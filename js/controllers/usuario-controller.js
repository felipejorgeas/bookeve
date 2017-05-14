var UsuarioController = function ($rootScope, $routeParams, BookEveAPIService, AuthenticationService) {
    var self = this;
    self.accessAdm = false;
    self.usuarios = [];
    self.user = {};
    self.accessLevels = [
        {
            title: 'participante'
        },
        {
            title: 'organizador'
        },
        {
            title: 'administrador'
        }
    ];
    self.status = [
        {
            title: 'Inativo'
        },
        {
            title: 'Ativo'
        }
    ];

    self.getUsuarios = function () {
        var where = {
            deleted: 0
        };
        BookEveAPIService.User.getAll(where, self.getUsuariosResponse);
    };
    self.getUsuariosResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status) {
                self.usuarios = response.data;
            } else {
                alert(response.message);
            }
        }
    };
    self.getUsuario = function (userId) {
        BookEveAPIService.User.getOne(userId, self.getUsuarioResponse);
    };
    self.getUsuarioResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status) {
                self.user = response.data;
            } else {
                alert(response.message);
            }
        }
    };
    self.editar = function (userId) {
        $rootScope.loadPage('/painel/usuarios/' + userId);
    };
    self.atualizar = function (user) {
        BookEveAPIService.User.update(user, self.atualizarUsuarioResponse);
    };
    self.atualizarUsuarioResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                alert('Dados do usuário atualizados com sucesso!');
            } else {
                alert(response.message);
            }
        }
    };
    self.remover = function (userId) {
        if (confirm('Deseja remover este usuário?')) {
            BookEveAPIService.User.delete(userId, self.removeUsuarioResponse);
        }
    };
    self.removeUsuarioResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status) {
                self.getUsuarios();
            } else {
                alert(response.message);
            }
        }
    };
    self.init = function () {
        self.accessAdm = AuthenticationService.getUserAuthenticated().accessLevel === 'administrador' ? true : false;
        var userId = $routeParams.id;
        if (userId > 0) {
            if (self.accessAdm || (!self.accessAdm && userId == $rootScope.usuarioLogado.id)) {
                self.getUsuario(userId);
            } else {
                alert('Acesso negado!');
                self.getUsuarios();
            }
        } else {
            self.getUsuarios();
        }
    };
    self.init();
};
UsuarioController.$inject = ['$rootScope', '$routeParams', 'BookEveAPIService', 'AuthenticationService'];