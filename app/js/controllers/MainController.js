'use strict';

app.controller('MainController',
    function ($scope, authService) {
        $scope.isLoggedIn = authService.isLoggedIn();
        $scope.isAnonymous = authService.isAnonymous();
    }
);
