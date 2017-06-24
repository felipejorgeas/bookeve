var HomeController = function ($rootScope, BookEveAPIService) {
    var self = this;
    self.eventos = [];
    self.getEventos = function () {
        var where = {
            deleted: 0
        };
        BookEveAPIService.Event.getAll(where, self.getEventosResponse);
    };
    self.getBanner = function (evento) {
        var image = '';
        if (evento.id) {
            image = BookEveAPIService.getApiUrl() + '/events_content/' + evento.id + '/' + evento.banner;
        }
        return image;
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
    self.loadEvent = function (eventId) {
        $rootScope.loadPage('/evento/' + eventId);
    };
    self.init = function () {
        self.getEventos();
    }
    self.init();
}
HomeController.$inject = ['$rootScope', 'BookEveAPIService'];
angular.module('bookeve').controller('HomeController', HomeController);