var EventoController = function ($rootScope, $routeParams, BookEveAPIService, AuthenticationService, CepService) {
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
    self.lecturer = '';
    self.video = '';
    self.bannerLoaded = false;
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
                self.event = evento;
                if (self.event.banner.length) {
                    var image = BookEveAPIService.getApiUrl() + '/banners/' + self.event.id + '/' + self.event.banner;
                    self.bannerLoaded = true;
                    document.getElementById('banner').style.backgroundImage = 'url("' + image + '")';
                }
            } else {
                alert(response.message);
            }
        }
    };
    self.setBanner = function (files) {
        self.bannerLoaded = true;
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var dataURI = e.target.result;
            self.event.image = dataURI;
            document.getElementById('banner').style.backgroundImage = 'url("' + dataURI + '")';
        }
        reader.readAsDataURL(file);
    };
    self.insertLecturer = function () {
        var lecturer = self.lecturer;
        if (!lecturer.length) {
            alert('Informe o nome do palestrante!');
        } else {
            if (self.event.id) {
                var lecturers = {
                    eventId: self.event.id,
                    lecturers: [
                        {
                            name: lecturer
                        }
                    ]
                };
                BookEveAPIService.Lecturer.insert(lecturers, self.insertLecturerResponse);
            } else {
                if (!self.event.lecturers) {
                    self.event.lecturers = [];
                }
                var lecturer = {
                    name: lecturer
                };
                self.event.lecturers.push(lecturer);
                self.lecturer = '';
            }
        }
    };
    self.insertLecturerResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                var lecturers = response.data;
                lecturers.forEach(function (item) {
                    self.event.lecturers.push(item);
                });
                self.lecturer = '';
            } else {
                alert(response.message);
            }
        }
    };
    self.removeLecturer = function (lecturer) {
        if (self.event.id) {
            BookEveAPIService.Lecturer.delete(lecturer.id, self.removeLecturerResponse);
        } else {
            var index = self.event.lecturers.indexOf(lecturer);
            self.event.lecturers.splice(index, 1);
        }
    };
    self.removeLecturerResponse = function (resp, lecturerId) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                var lecturers = self.event.lecturers.filter(function (item) {
                    return (item.id != lecturerId);
                });
                self.event.lecturers = lecturers;
            } else {
                alert(response.message);
            }
        }
    };
    self.insertVideo = function () {
        var url = self.video;
        if (!url.length) {
            alert('Informe a url do vídeo!');
        } else {
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
    self.salvar = function (event) {
        if (!event.id) {
            event.userId = AuthenticationService.getUserAuthenticated().id;
            BookEveAPIService.Event.insert(event, self.salvarEventoResponse);
        } else {
            BookEveAPIService.Event.update(event, self.salvarEventoResponse);
        }
    };
    self.salvarEventoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                alert('Dados do evento salvos com sucesso!');
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
    self.buscarEndereco = function (cep) {
        CepService.searchAddressByCep(cep, self.buscarEnderecoResponse);
    };
    self.buscarEnderecoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            self.event.address = response.logradouro;
            self.event.neighborhood = response.bairro;
            self.event.city = response.localidade;
            self.event.state = response.uf;
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
EventoController.$inject = ['$rootScope', '$routeParams', 'BookEveAPIService', 'AuthenticationService', 'CepService'];