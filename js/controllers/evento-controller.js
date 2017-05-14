var EventoController = function ($rootScope, $routeParams, BookEveAPIService, AuthenticationService) {
    var self = this;
    self.eventos = [];
    self.event = {};
    self.getEventos = function () {
        var where = {
            deleted: 0
        };
        BookEveAPIService.Event.getAll(where, self.getEventosResponse);
    };
    self.getEventosResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status) {
                self.eventos = response.data;
            } else {
                alert(response.message);
            }
        }
    };
    self.getEvento = function (eventId) {
        BookEveAPIService.Event.getOne(eventId, self.getEventoResponse);
    };
    self.getEventoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status) {
                self.event = response.data;
            } else {
                alert(response.message);
            }
        }
    };
    self.editar = function (eventId) {
        $rootScope.loadPage('/painel/eventos/' + eventId);
    };
    self.atualizar = function (event) {
        BookEveAPIService.Event.update(user, self.atualizarEventoResponse);
    };
    self.atualizarEventoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                alert('Dados do evento atualizados com sucesso!');
            } else {
                alert(response.message);
            }
        }
    };
    self.remover = function (eventId) {
        if (confirm('Deseja remover este evento?')) {
            BookEveAPIService.Event.delete(eventId, self.removeEventoResponse);
        }
    };
    self.removeEventoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status) {
                self.getEventos();
            } else {
                alert(response.message);
            }
        }
    };
    self.init = function () {
        var eventId = $routeParams.id;
        if (eventId > 0) {
            self.getEvento(eventId);
        } else {
            self.getEventos();
        }
    };
    self.init();
};
EventoController.$inject = ['$rootScope', '$routeParams', 'BookEveAPIService', 'AuthenticationService'];