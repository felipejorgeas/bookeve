var HomeController = function (BookEveAPIService) {
    var self = this;
    self.eventos = [];
    self.getEventos = function () {
        var where = {
            deleted: 0
        };
        BookEveAPIService.Event.getAll(where, self.getEventosResponse);
    };
    self.getBanner = function(evento){
        var image = BookEveAPIService.getApiUrl() + '/banners/' + evento.id + '/' + evento.banner;
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
    self.init = function(){
        self.getEventos();
    }
    self.init();
}
HomeController.$inject = ['BookEveAPIService'];