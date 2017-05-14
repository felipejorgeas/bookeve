var BookEveAPIService = function ($http) {
    var apiUrl = 'http://192.168.0.16:5555/bookeve-api';
    return {
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
            }
        },
        Content: {
        }
    }
}
BookEveAPIService.$inject = ['$http'];