'use strict';

app.controller('ProfileController',
    function ($scope, $location, userService, profileService, notifyService) {
        $scope.isLoggedIn = userService.isLoggedIn();
        $scope.userData = {
            name : userService.getUserFullName(),
            email : userService.getUserEmail(),
            gender : userService.getUserGender()
        }

        $scope.editProfile = function(userData) {
            profileService.editProfile(userData,
                function success() {
                    notifyService.showInfo("Successfully profile edited");
                    userService.saveDataAboutMe(userData);
                    setTimeout(function(){
                        window.location.reload();
                    }, 500);
                },
                function error(err) {
                    notifyService.showError("Profile edit failed", err);
                }
            );
        };

       
    }
);
