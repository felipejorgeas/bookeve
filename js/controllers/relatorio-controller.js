var RelatorioController = function ($rootScope, BookEveAPIService, $routeParams) {
    var self = this;
    self.eventos = [];
    self.evento = {};
    self.getEvento = function (eventId) {
        BookEveAPIService.Event.getOne(eventId, self.getEventoResponse);
    };
    self.getEventoResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status) {
                var evento = response.data;
                self.event = evento;
                self.formatDataCharts(self.event.users);
            }
        }
    };
    self.formatDataCharts = function (users) {
        var ChartGeneroData = [];
        var ChartCidadeData = [];
        var ChartEstadoData = [];
        var chartData = {
            chartGenero: [],
            chartCidade: [],
            chartEstado: []
        };

        self.event.users.forEach(function (user) {
            if (!ChartGeneroData.hasOwnProperty(user.gender)) {
                ChartGeneroData[user.gender] = 0;
            }
            ChartGeneroData[user.gender]++;
            if (!ChartCidadeData.hasOwnProperty(user.city)) {
                ChartCidadeData[user.city] = 0;
            }
            ChartCidadeData[user.city]++;
            if (!ChartEstadoData.hasOwnProperty(user.state)) {
                ChartEstadoData[user.state] = 0;
            }
            ChartEstadoData[user.state]++;
        });

        chartData.chartGenero = ChartGeneroData;
        chartData.chartCidade = ChartCidadeData;
        chartData.chartEstado = ChartEstadoData;

        self.loadCharts(chartData);
    }
    self.loadCharts = function (chartData) {
        var generos = Object.keys(chartData.chartGenero);
        var rows = generos.map(function (genero) {
            return { c: [{ v: genero }, { v: chartData.chartGenero[genero] }] };
        });
        self.chartGenero = {}
        self.chartGenero.type = 'PieChart';
        self.chartGenero.data = {
            cols: [
                { id: 't', label: 'Gênero ', type: 'string' },
                { id: 's', label: 'Inscritos ', type: 'number' }
            ],
            rows: rows
        };
        self.chartGenero.options = {
            title: 'Inscritos por Gênero'
        }

        var cidades = Object.keys(chartData.chartCidade);
        var rows = cidades.map(function (cidade) {
            return { c: [{ v: cidade }, { v: chartData.chartCidade[cidade] }] };
        });
        rows.unshift(['Cidade', 'Inscritos']);
        self.chartCidade = {}
        self.chartCidade.type = 'GeoChart';
        self.chartCidade.data = rows;
        self.chartCidade.options = {
            title: 'Inscritos por Cidade',
            region: 'BR',
            displayMode: 'markers',
            colorAxis: {
                colors: ['#EC008C', '#00ADEE']
            }
        }

        var estados = Object.keys(chartData.chartEstado);
        var rows = estados.map(function (estado) {
            return { c: [{ v: estado }, { v: chartData.chartEstado[estado] }] };
        });
        self.chartEstado = {}
        self.chartEstado.type = 'BarChart';
        self.chartEstado.data = {
            cols: [
                { id: 't', label: 'Estado ', type: 'string' },
                { id: 's', label: 'Inscritos ', type: 'number' }
            ],
            rows: rows
        };
        self.chartEstado.options = {
            title: 'Inscritos por Estado',
            legend: { position: 'top' }
        }
    };
    self.init = function () {
        var eventId = $routeParams.id;
        if (eventId) {
            self.getEvento(eventId);
        } else {
            alert('Evento não encontrado!');
        }
    };
    self.init();
}
RelatorioController.$inject = ['$rootScope', 'BookEveAPIService', '$routeParams'];
angular.module('bookeve').controller('RelatorioController', RelatorioController);