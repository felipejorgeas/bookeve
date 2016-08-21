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