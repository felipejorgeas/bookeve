var BookEveAPIService = function ($http) {
    var apiUrl = 'http://192.168.0.11:5555/bookeve-api';
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
            }
        },
        Event: {
        },
        Content: {
        }
    }
}
BookEveAPIService.$inject = ['$http'];