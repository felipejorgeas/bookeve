var BookEveAPIService = function ($http, API_URL) {
    var apiUrl = API_URL;
    return {
        getApiUrl: function () {
            return apiUrl;
        },
        User: {
            register: function (user, callback) {
                var url = apiUrl + '/users/';
                $http.post(url, user).then(function (resp) {
                    callback(resp);
                });
            },
            login: function (user, callback) {
                var url = apiUrl + '/users/' + user.email + '/' + user.senha;
                $http.get(url).then(function (resp) {
                    callback(resp);
                });
            },
            getOne: function (userId, callback) {
                var url = apiUrl + '/users/' + userId;
                $http.get(url).then(function (resp) {
                    callback(resp);
                });
            },
            getAll: function (where, callback) {
                var url = apiUrl + '/users/';
                if (where) {
                    var queryString = Object.keys(where).map(function (k) {
                        k = encodeURIComponent(k) + '=' + encodeURIComponent(where[k]);
                        return k;
                    }).join('&');
                    url += '?' + queryString;
                }
                $http.get(url).then(function (resp) {
                    callback(resp);
                });
            },
            update: function (user, callback) {
                var url = apiUrl + '/users/' + user.id;
                $http.put(url, user).then(function (resp) {
                    callback(resp);
                });
            },
            delete: function (userId, callback) {
                var url = apiUrl + '/users/' + userId;
                $http.delete(url).then(function (resp) {
                    callback(resp);
                });
            }
        },
        Event: {
            getOne: function (eventId, callback) {
                var url = apiUrl + '/events/' + eventId;
                $http.get(url).then(function (resp) {
                    callback(resp);
                });
            },
            getAll: function (where, callback) {
                var url = apiUrl + '/events/';
                if (where) {
                    var queryString = Object.keys(where).map(function (k) {
                        k = encodeURIComponent(k) + '=' + encodeURIComponent(where[k]);
                        return k;
                    }).join('&');
                    url += '?' + queryString;
                }
                $http.get(url).then(function (resp) {
                    callback(resp);
                });
            },
            insert: function (event, callback) {
                var url = apiUrl + '/events/';
                $http.post(url, event).then(function (resp) {
                    callback(resp);
                });
            },
            update: function (event, callback) {
                var url = apiUrl + '/events/' + event.id;
                $http.put(url, event).then(function (resp) {
                    callback(resp);
                });
            },
            delete: function (eventId, callback) {
                var url = apiUrl + '/events/' + eventId;
                $http.delete(url).then(function (resp) {
                    callback(resp);
                });
            },
            participe: function (event, user, callback) {
                var url = apiUrl + '/eventsUsers/';
                var data = {
                    event: event,
                    user: user
                };
                $http.post(url, data).then(function (resp) {
                    callback(resp);
                });
            },
            participeDelete: function (id, callback) {
                var url = apiUrl + '/eventsUsers/' + id;
                $http.delete(url).then(function (resp) {
                    callback(resp);
                });
            },
            participeFind: function (eventId, userId, callback) {
                var url = apiUrl + '/eventsUsers/event/' + eventId + '/user/' + userId;
                $http.get(url).then(function (resp) {
                    callback(resp);
                });
            }
        },
        Lecturer: {
            insert: function (lecturers, callback) {
                var url = apiUrl + '/eventsLecturers/';
                $http.post(url, lecturers).then(function (resp) {
                    callback(resp);
                });
            },
            delete: function (lecturerId, callback) {
                var url = apiUrl + '/eventsLecturers/' + lecturerId;
                $http.delete(url).then(function (resp) {
                    callback(resp, lecturerId);
                });
            }
        },
        Video: {
            insert: function (videos, callback) {
                var url = apiUrl + '/eventsVideos/';
                $http.post(url, videos).then(function (resp) {
                    callback(resp);
                });
            },
            delete: function (videoId, callback) {
                var url = apiUrl + '/eventsVideos/' + videoId;
                $http.delete(url).then(function (resp) {
                    callback(resp, videoId);
                });
            }
        },
        Comunicate: {
            send: function (data, callback) {
                var url = apiUrl + '/comunicates/';
                $http.post(url, data).then(function (resp) {
                    callback(resp);
                });
            }
        },
        Content: {
        }
    }
}
BookEveAPIService.$inject = ['$http', 'API_URL'];
angular.module('bookeve').factory('BookEveAPIService', BookEveAPIService);