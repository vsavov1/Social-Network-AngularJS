'use strict';

app.controller('UserController',
    function ($scope, $rootScope, $location, userService, notifyService, $routeParams) {
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
                    },1000);
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
            var _this = this;

            userService.register(userData,
                function success(data) {
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
            userService.logout(
                function success() {
                    notifyService.showInfo("Logout successfully");
                    $location.path("/");
                    setTimeout(function(){
                        window.location.reload();
                    }, 500);
                }, function error (err) {
                    notifyService.showError("Logout failed", err);
                }
            );
        }

        $scope.searchUser = function (searchUser) {
            userService.searchUser(searchUser,
                function success(data) {
                    $scope.searchResults = data;
                    $("#search-overlay").show();
                    $("#search-overlay").attr("data-t",0);
                }, function error (err) {
                    notifyService.showError("Search failed", err);
                }
            );
        }

        $scope.getUserWall = function () {
            userService.getUserWall($routeParams.id,
                function success(data) {
                    console.log(data);
                    $scope.userWallData = data;
                }, function error (err) {
                    notifyService.showError("Search failed", err);
                }
            );
        }

        $scope.getUserWallFriendsPreveiw = function () {
            userService.getUserWallFriendsPreveiw($routeParams.id,
                function success(data) {
                    console.log(data);
                    $scope.userWallFriendsPreveiw = data;
                }, function error (err) {
                    notifyService.showError("friend preview failed", err);
                }
            );
        }

        $scope.getAllFriends = function () {
            console.log($routeParams.id);
            userService.getAllFriends($routeParams.id,
                function success(data) {
                    $scope.allFriends = data;
                    console.log(data);
                }, function error (err) {
                    notifyService.showError("friend preview failed", err);
                }
            );
        }

        $scope.getUserWallFriendsPreveiw = function () {
            userService.getUserWallFriendsPreveiw($routeParams.id,
                function success(data) {
                    $scope.userWallFriendsPreveiw = data;
                }, function error (err) {
                    notifyService.showError("friend preview failed", err);
                }
            );
        }
        
    }
);
