var AuthenticationService = function () {
    return {
        isAuthenticated: function () {
            var auth = localStorage.getItem('auth');
            return !auth ? false : true;
        },
        auth: function () {
            localStorage.setItem('auth', true);
            return true;
        },
        logout: function () {
            localStorage.removeItem('auth');
            return true;
        },
        levelAccess: function () {
            
        }
    }
}
AuthenticationService.$inject = [];