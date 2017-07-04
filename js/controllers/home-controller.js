var HomeController = function ($rootScope, BookEveAPIService, $filter) {
    var self = this;
    self.eventos = [];
    self.eventosPaginator = [];
    self.qtdePage = 10;
    self.pageIndex = 0;
    self.search = '';
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
                self.eventosMini = self.random(self.eventos);
                self.eventosSmall = self.random(self.eventos);
            } else {
                alert(response.message);
            }
        }
    };
    self.loadEvent = function (eventId) {
        $rootScope.loadPage('/evento/' + eventId);
    };
    self.getBanner = function (evento) {
        var image = '';
        if (evento.id) {
            image = BookEveAPIService.getApiUrl() + '/events_content/' + evento.id + '/' + evento.banner;
        }
        return image;
    };
    self.getEventosPaginator = function () {
        var offset = self.pageIndex * self.qtdePage;
        self.eventosPaginator = self.eventos;
        self.eventosPaginator = $filter('filter')(self.eventosPaginator, { name: self.search });
        return self.eventosPaginator.slice(offset, offset + self.qtdePage);
    };
    self.prevPaginator = function () {
        if (self.pageIndex > 0) {
            self.pageIndex -= 1;
        }
    };
    self.nextPaginator = function () {
        if (self.pageIndex < (self.eventosPaginator.length / self.qtdePage) - 1) {
            self.pageIndex += 1;
        }
    };
    self.random = function (array) {
        var arr = [];
        angular.copy(array, arr);
        return arr.sort(function () {
            return 0.5 - Math.random();
        });
    }
    self.init = function () {
        self.getEventos();
    }
    self.init();
}
HomeController.$inject = ['$rootScope', 'BookEveAPIService', '$filter'];
angular.module('bookeve').controller('HomeController', HomeController);