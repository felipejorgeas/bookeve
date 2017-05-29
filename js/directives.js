angular.module('bookeve').directive('myAccount', function () {
    return {
        replace: true,
        templateUrl: 'templates/my-account.html'
    };
});

angular.module('bookeve').directive('myPanelMenu', function () {
    return {
        replace: true,
        templateUrl: 'templates/my-panel-menu.html'
    };
});

angular.module('bookeve').directive('uploadfile', function () {
    return {
        link: function (scope, element) {
            element.bind('click', function (e) {
                document.getElementById('upload-banner').click();
            });
        }
    };
});

angular.module('bookeve').directive('fileChange', function () {
    return {
        restrict: 'A',
        scope: {
            handler: '&'
        },
        link: function (scope, element) {
            element.on('change', function (event) {
                scope.$apply(function () {
                    scope.handler({ files: event.target.files });
                });
            });
        }
    };
});