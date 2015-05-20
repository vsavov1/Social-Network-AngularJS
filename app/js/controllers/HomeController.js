'use strict';

app.controller('HomeController',
    function ($scope, authService) {
        $scope.isLoggedIn = authService.isLoggedIn();
        $scope.isAnonymous = authService.isAnonymous();
    }
);
