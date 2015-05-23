'use strict';

app.controller('UserController',
    function ($scope, $rootScope, $location, userService, notifyService) {
        $scope.isLoggedIn = userService.isLoggedIn();
        $scope.userFullName = userService.getUserFullName();
        $scope.profileImageData = userService.getProfilePicture();

        $scope.login = function(userData) {
            userService.login(userData,
                function success(data) {
                    // if (userData.username.length < 6) {
                    //     notifyService.showWarning("Username length must be greater than 6 chars.");
                    //     return;
                    // }
                    // remove comment
                    userService.getDataAboutMe(function success(dataAboutme) {
                        userService.saveDataAboutMe(dataAboutme);
                    })
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

            userService.register(userData,
                function success() {
                    notifyService.showInfo("User registered successfully");
                        userService.getDataAboutMe(function success(dataAboutme) {
                            userService.saveDataAboutMe(dataAboutme);
                        })
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
            userService.logout(
                function success() {
                    notifyService.showInfo("Logout successfully");
                    window.location.reload();
                    $location.path("/");
                }, function error (err) {
                    notifyService.showError("Logout failed", err);
                }
            );
        }
    }
);
