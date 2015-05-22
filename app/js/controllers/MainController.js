'use strict';

app.controller('MainController',
    function ($scope, authService) {
        $scope.isLoggedIn = authService.isLoggedIn();
    }
);
