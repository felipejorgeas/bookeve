var EventoController = function ($rootScope, $routeParams, BookEveAPIService, AuthenticationService) {
    var self = this;
    self.status = [
        {
            title: 'Inativo'
        },
        {
            title: 'Ativo'
        }
    ];
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
                var evento = response.data;
                evento.videos = self.formatVideos(evento.videos);
                self.event = evento;
            } else {
                alert(response.message);
            }
        }
    };
    self.formatVideos = function (videos) {
        var find = 'watch?v=';
        var replace = 'embed/';
        videos = videos.map(function (item) {
            item.embed = item.url.replace(find, replace);
            return item;
        });
        return videos;
    };
    self.insertVideo = function () {
        var url = self.video;
        if (self.event.id) {
            var videos = {
                eventId: self.event.id,
                videos: [
                    {
                        url: url
                    }
                ]
            };
            BookEveAPIService.Video.insert(videos, self.insertVideoResponse);
        } else {
            if (!self.event.videos) {
                self.event.videos = [];
            }
            var video = {
                url: url
            };
            self.event.videos.push(video);
            self.video = '';
        }
    };
    self.insertVideoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                var videos = response.data;
                videos.forEach(function (item) {
                    self.event.videos.push(item);
                });
                self.video = '';
            } else {
                alert(response.message);
            }
        }
    };
    self.removeVideo = function (video) {
        if (self.event.id) {
            BookEveAPIService.Video.delete(video.id, self.removeVideoResponse);
        } else {
            var index = self.event.videos.indexOf(video);
            self.event.videos.splice(index, 1);
            console.log(index);
        }
    };
    self.removeVideoResponse = function (resp, videoId) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                var videos = self.event.videos.filter(function (item) {
                    return (item.id != videoId);
                });
                self.event.videos = videos;
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
        self.accessAdm = AuthenticationService.getUserAuthenticated().accessLevel === 'administrador' ? true : false;
        self.accessOrg = AuthenticationService.getUserAuthenticated().accessLevel === 'organizador' ? true : false;
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