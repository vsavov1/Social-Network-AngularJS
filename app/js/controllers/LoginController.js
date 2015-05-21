'use strict';

app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $scope.login = function(userData) {
            authService.login(userData,
                function success(data) {
                    notifyService.showInfo("Login successful");
                    setTimeout(function(){
                        window.location.reload();
                    }, 500);
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };
    }
);
