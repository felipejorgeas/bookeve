var EventoController = function ($scope) {
    $scope.gridOptions = {};
    $scope.loadGridEventos = function () {
        $scope.gridOptions.columnDefs = [
            {name: 'id', displayName: '#ID'},
            {name: 'name', displayName: 'Nome'}
        ];
        $scope.gridOptions.data = [
            {
                id: 1,
                name: 'teste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 2,
                name: 'tsdfdeste'
            },
            {
                id: 3,
                name: 'testekyk6'
            }
        ];
    };
    $scope.init = function () {
        $scope.loadGridEventos();
    };
    $scope.init();
};
EventoController.$inject = ['$scope'];