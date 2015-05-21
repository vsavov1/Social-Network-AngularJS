'use strict';

app.controller('RegisterController',
    function ($scope, $location, authService, notifyService) {
        var username = $scope.username;
        var password = $scope.password;
        var confirmPassword = $scope.confirmPassword;
        var name = $scope.name;
        var email = $scope.email;

       
    
        $scope.register = function(userData) {
            if (userData.username.length < 6) {
                notifyService.showWarning("Username length must be greater than 6 chars");
                return;
            } else if (userData.password !== userData.confirmPassword) {
                notifyService.showWarning("pass");
                return;
            } else if (userData.password.length < 6) {
                notifyService.showWarning("passsssssss");
                return;
            } else if (userData.name.length < 6) {
                notifyService.showWarning("nameee");
                return;
            } else if (userData.email.indexOf('@') < 0 || userData.email.length < 4) {
                notifyService.showWarning("maill");
                return;
            } else if(!userData.gender){
                notifyService.showWarning("gender");
                return;
            }

            authService.register(userData,
                function success() {
                    notifyService.showInfo("User registered successfully");
                      setTimeout(function(){
                        window.location.reload();
                    }, 500);
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }
);
