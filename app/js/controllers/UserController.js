'use strict';

app.controller('UserController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $scope.isLoggedIn = authService.isLoggedIn();
        
        $scope.login = function(userData) {
            authService.login(userData,
                function success(data) {
                    // if (userData.username.length < 6) {
                    //     notifyService.showWarning("Username length must be greater than 6 chars.");
                    //     return;
                    // }
                    // remove comment
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

        $scope.register = function(userData) {
            if (userData.username.length < 6) {
                notifyService.showWarning("Username length must be greater than 6 chars.");
                return;
            } else if (userData.password !== userData.confirmPassword) {
                notifyService.showWarning("Passwords must be same");
                return;
            } else if (userData.password.length < 6) {
                notifyService.showWarning("Passwor length must be greater than 6 chars.");
                return;
            } else if (userData.name.length < 6) {
                notifyService.showWarning("Name length must be greater than 6 chars.");
                return;
            } else if (userData.email.indexOf('@') < 0 || userData.email.length < 4) {
                notifyService.showWarning("Invalid email.");
                return;
            } else if(!userData.gender){
                notifyService.showWarning("Please choose gender.");
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

        $scope.logout = function () {
            authService.logout(
                function success() {
                    notifyService.showInfo("Logout successfully");
                    setTimeout(function(){
                        window.location.reload();
                    }, 500);
                    $location.path("/");
                }, function error (err) {
                    notifyService.showError("User Logout failed", err);
                }
            );
            // authService.logout(function success () {
            //     notifyService.showInfo("Logout  successfully");
            // },function  (argument) {
            //     notifyService.showInfo("errrr  successfully");
              
            // });
        }
    }
);
