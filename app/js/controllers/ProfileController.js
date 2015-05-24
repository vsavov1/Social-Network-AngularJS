'use strict';

app.controller('ProfileController',
    function ($scope, $location, userService, profileService, notifyService) {
        $scope.isLoggedIn = userService.isLoggedIn();
        $scope.userData = {
            name : userService.getUserFullName(),
            email : userService.getUserEmail(),
            gender : userService.getUserGender(),
            profileImageData : userService.getProfilePicture(),
            coverImageData : userService.getCoverPicture()

        }

        $scope.changePassword = function(userData) {
            profileService.changePassword(userData,
                function success() {
                    notifyService.showInfo("Password successfully changed");
                    setTimeout(function(){
                        window.location.reload();
                    }, 500);
                },
                function error(err) {
                    notifyService.showError("Password change failed", err);
                }
            );
        };


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

        $scope.profilePicutreChanged = function(element) {
             $scope.$apply(function(scope) {
                 var photofile = element.files[0];
                 var reader = new FileReader();
                 reader.onload = function(e) {
                    $scope.userData.profileImageData = reader.result;
                 };
                 reader.readAsDataURL(photofile);
             });
        };

        $scope.coverPicutreChanged = function(element) {
             $scope.$apply(function(scope) {
                 var photofile = element.files[0];
                 var reader = new FileReader();
                 reader.onload = function(e) {
                    $scope.userData.coverImageData = reader.result;
                 };
                 reader.readAsDataURL(photofile);
             });
        };
    }
);
