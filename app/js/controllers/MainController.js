'use strict';

app.controller('MainController',
    function ($scope, userService) {
        $scope.isLoggedIn = userService.isLoggedIn();
    }
);
