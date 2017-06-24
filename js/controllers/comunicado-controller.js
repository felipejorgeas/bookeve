var ComunicadoController = function ($scope, BookEveAPIService, ngDialog) {
    var self = this;
    self.comunicado = '';
    self.eventId = $scope.ngDialogData.eventId;
    self.send = function () {
        var data = {
            eventId: self.eventId,
            comunicado: self.comunicado
        }
        BookEveAPIService.Comunicate.send(data, self.sendResponse);
    };
    self.sendResponse = function (resp) {
        if (resp && resp.status === 200 && resp.data) {
            var response = resp.data;
            if (response.status === 200) {
                alert('Comunicado enviado com sucesso!');
                ngDialog.closeAll();
            }
            else {
                alert(response.message);
            }
        }
    };
}
ComunicadoController.$inject = ['$scope', 'BookEveAPIService', 'ngDialog'];
angular.module('bookeve').controller('ComunicadoController', ComunicadoController);