var AuthenticationService = function (BookEveAPIService) {
    var auth = {
        callback: null,
        register: function (user, callback) {
            auth.callback = callback;
            BookEveAPIService.User.register(user, auth.registerResponse);
        },
        registerResponse: function (resp) {
            var result = {
                ok: false,
                message: '',
                data: null
            };
            if (resp && resp.status === 200 && resp.data) {
                var response = resp.data;
                if (response.status) {
                    localStorage.setItem('auth', true);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    result.data = response.data;
                    result.ok = true;
                } else {
                    result.message = response.message;
                }
            }
            auth.callback(result);
        },
        auth: function (user, callback) {
            auth.callback = callback;
            BookEveAPIService.User.login(user, auth.authResponse);
        },
        authResponse: function (resp) {
            var result = {
                ok: false,
                message: '',
                data: null
            };
            if (resp && resp.status === 200 && resp.data) {
                var response = resp.data;
                if (response.status) {
                    localStorage.setItem('auth', true);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    result.data = response.data;
                    result.ok = true;
                } else {
                    result.message = response.message;
                }
            }
            auth.callback(result);
        },
        logout: function () {
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
            return true;
        },
        isAuthenticated: function () {
            var auth = localStorage.getItem('auth');
            return !auth ? false : true;
        },
        isAccessLevel: function (level) {
            if (!auth.isAuthenticated()) {
                return false;
            } else {
                var user = auth.getUserAuthenticated();
                return user.accessLevel === level;
            }
        },
        getUserAuthenticated: function () {
            if (!auth.isAuthenticated()) {
                return false;
            } else {
                var user = JSON.parse(localStorage.getItem('user'));
                return !user ? false : user;
            }
        }
    };
    return auth;
};
AuthenticationService.$inject = ['BookEveAPIService'];
angular.module('bookeve').factory('AuthenticationService', AuthenticationService);