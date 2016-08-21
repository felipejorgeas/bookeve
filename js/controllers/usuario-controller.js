var UsuarioController = function () {
    this.usuarios = [];
    this.getUsuarios = function () {
        return [
            {
                name: 'teste'
            },
            {
                name: 'teste1'
            },
            {
                name: 'teste2'
            }
        ];
    };
    this.init = function () {
        this.eventos = this.getUsuarios();
    };
    this.init();
};
UsuarioController.$inject = [];