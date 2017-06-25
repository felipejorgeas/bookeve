var EventoController = function ($scope, $rootScope, $routeParams, $timeout, BookEveAPIService, AuthenticationService, CepService, ngDialog) {
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
    self.participatedAllUsers = false;
    self.bannerLoaded = false;
    self.showMenu = false;
    self.showMask = false;
    self.showMenuOpcoes = function (evento) {
        self.hideMenuOpcoes(function () {
            evento.menuActive = true;
            self.showMask = true;
        });
    };
    self.hideMenuOpcoes = function (callback) {
        self.eventos = self.eventos.map(function (event) {
            event.menuActive = false;
            return event;
        });
        self.showMask = false;
        if (callback) {
            callback();
        }
    };
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
                var dateIni = new Date(self.event.dateIni);
                var dateFin = new Date(self.event.dateFin);
                self.event.dateIniFormat = {
                    date: Utils.getDateFormat(dateIni),
                    hour: Utils.getDateZeroFormat(dateIni.getHours()),
                    minute: Utils.getDateZeroFormat(dateIni.getMinutes()),
                };
                self.event.dateFinFormat = {
                    date: Utils.getDateFormat(dateFin),
                    hour: Utils.getDateZeroFormat(dateFin.getHours()),
                    minute: Utils.getDateZeroFormat(dateFin.getMinutes()),
                };
                if (self.event.banner.length && document.getElementById('banner')) {
                    var image = BookEveAPIService.getApiUrl() + '/events_content/' + self.event.id + '/' + self.event.banner;
                    self.bannerLoaded = true;
                    document.getElementById('banner').style.backgroundImage = 'url("' + image + '")';
                }
                if (!$scope.ngDialogData) {
                    delete self.event.users;
                }
                self.inscricao(self.event.id);
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
        var dateIni = Utils.getDateDbFormat(event.dateIniFormat.date) + ' ' + event.dateIniFormat.hour + ':' + event.dateIniFormat.minute;
        var dateFin = Utils.getDateDbFormat(event.dateFinFormat.date) + ' ' + event.dateFinFormat.hour + ':' + event.dateFinFormat.minute;
        event.dateIni = dateIni;
        event.dateFin = dateFin;
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
    self.getMap = function (evento) {
        if (document.getElementById('event-map')) {
            var address = evento.address + ', ' + evento.number + ', ' + evento.city + ', ' + evento.state + ' - ' + evento.zip;
            var map = new google.maps.Map(document.getElementById('event-map'), {
                zoom: 14,
            });
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: address
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: address
                    });
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });
                }
            });
        }
    };
    self.getOrganizador = function (evento) {
        var organizador = '';
        if (evento.organizer) {
            organizador = evento.organizer.name + ' - ' + evento.organizer.email;
        }
        return organizador;
    };
    self.participar = function (evento) {
        var user = AuthenticationService.getUserAuthenticated();
        if (!user) {
            sessionStorage.setItem('redirectEvent', evento.id);
            $rootScope.loadPage('/login');
        } else {
            if (confirm('Deseja confirmar sua inscrição para este evento?')) {
                BookEveAPIService.Event.participe(evento, user, self.participarEventoResponse);
            }
        }
    };
    self.participarEventoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                alert('Inscrição confirmada!');
                self.inscricao(response.data.eventId);
            } else {
                alert(response.message);
            }
        }
    };
    self.cancelar = function (evento) {
        if (confirm('Deseja cancelar sua inscrição para este evento?')) {
            BookEveAPIService.Event.participeDelete(evento.inscricao, self.cancelarEventoResponse);
        }
    };
    self.cancelarEventoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                alert('Inscrição cancelada!');
                self.event.inscricao = false;
            } else {
                alert(response.message);
            }
        }
    };
    self.inscricao = function (eventoId) {
        var user = AuthenticationService.getUserAuthenticated();
        BookEveAPIService.Event.participeFind(eventoId, user.id, self.inscricaoEventoResponse);
    };
    self.inscricaoEventoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200 && !response.data.deleted) {
                self.event.inscricao = response.data.id;
            }
        }
    };
    self.comunicadoParticipantes = function (eventId) {
        var data = {
            eventId: eventId
        }
        ngDialog.open({
            template: 'templates/popup-send-comunicate.html',
            controller: 'ComunicadoController',
            controllerAs: 'comunicadoCtrl',
            data: data
        });
    };
    self.listaParticipantes = function (eventoId) {
        BookEveAPIService.Event.participesList(eventoId, self.listaParticipantesResponse);
    };
    self.listaParticipantesResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200 && !response.data.deleted) {
                var url_file = BookEveAPIService.getApiUrl() + '/events_content/' + response.data.eventId + '/' + response.data.filename;
                window.open(url_file, 'Lista de participantes', 'width=800,height=600,scrollbars=yes');
            } else {
                alert(response.message);
            }
        }
    };
    self.presenca = function (eventId) {
        var data = {
            eventId: eventId
        }
        ngDialog.open({
            template: 'templates/popup-event-participated.html',
            controller: 'EventoController',
            controllerAs: 'eventoCtrl',
            data: data
        });
    };
    self.setParticipatedAllUsers = function () {
        self.participatedAllUsers = !self.participatedAllUsers;
        var set = self.participatedAllUsers
        var users = self.event.users.map(function (user) {
            user.Events[0].EventsUsers.participated = set;
            return user;
        });
        self.event.users = users;
    };
    self.saveParticipated = function (eventoId) {
        var users = self.event.users.map(function (user) {
            var eventUser = {
                userId: user.id,
                participated: user.Events[0].EventsUsers.participated
            }
            return eventUser;
        });
        BookEveAPIService.Event.participatedSave(eventoId, users, self.saveParticipatedResponse);
    };
    self.saveParticipatedResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                ngDialog.closeAll();
            } else {
                alert(response.message);
            }
        }
    };
    self.crachas = function (eventoId) {
        BookEveAPIService.Event.participesCrachas(eventoId, self.crachasResponse);
    };
    self.crachasResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200 && !response.data.deleted) {
                var url_file = BookEveAPIService.getApiUrl() + '/events_content/' + response.data.eventId + '/' + response.data.filename;
                window.open(url_file, 'Crachás', 'width=800,height=600,scrollbars=yes');
            } else {
                alert(response.message);
            }
        }
    };
    self.certificados = function (eventoId) {
        BookEveAPIService.Event.participesCertificates(eventoId, self.certificadosResponse);
    };
    self.certificadosResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200 && !response.data.deleted) {
                var url_file = BookEveAPIService.getApiUrl() + '/events_content/' + response.data.eventId + '/' + response.data.filename;
                window.open(url_file, 'Certificados', 'width=800,height=600,scrollbars=yes');
            } else {
                alert(response.message);
            }
        }
    };
    self.init = function () {
        self.accessAdm = AuthenticationService.getUserAuthenticated().accessLevel === 'administrador' ? true : false;
        self.accessOrg = AuthenticationService.getUserAuthenticated().accessLevel === 'organizador' ? true : false;
        var eventId = $routeParams.id || ($scope.ngDialogData && $scope.ngDialogData.eventId);
        if (eventId > 0) {
            self.getEvento(eventId);
            self.hours = Utils.getHours();
            self.minutes = Utils.getMinutes();
            $timeout(function () {
                self.getMap(self.event);
            }, 2000);
        } else {
            self.getEventos();
        }
    };
    self.init();
};
EventoController.$inject = ['$scope', '$rootScope', '$routeParams', '$timeout', 'BookEveAPIService', 'AuthenticationService', 'CepService', 'ngDialog'];
angular.module('bookeve').controller('EventoController', EventoController);