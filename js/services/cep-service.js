var CepService = function ($http) {
    var cep = {
        api: 'https://viacep.com.br/ws/%s/json/',
        searchAddressByCep: function (cep, callback) {
            var url = Utils.sprintf(this.api, cep);
            $http.get(url).then(function (resp) {
                callback(resp);
            });
        }
    };
    return cep;
};
CepService.$inject = ['$http'];