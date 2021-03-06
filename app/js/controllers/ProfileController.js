'use strict';

app.controller('ProfileController',
    function ($scope, $location, userService, profileService, notifyService) {
        $scope.isLoggedIn = userService.isLoggedIn();
        $scope.userData = {
            name : userService.getUserFullName(),
            email : userService.getUserEmail(),
            gender : userService.getUserGender(),
            profileImageData : userService.getProfilePicture(),
            coverImageData : userService.getCoverPicture(),
            currentUsername : userService.getUserName()
        }

        var feedPosition;
        $scope.feedPosts = [];
        $scope.busy = false;
        $scope.showMe = false;

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

        $scope.sendFriendRequest = function(username) {
            profileService.sendFriendRequest(username,
                function success() {
                    notifyService.showInfo("Friend request successfully sent");
                    setTimeout(function(){
                        window.location.reload();
                    }, 500);
                    
                },
                function error(err) {
                    notifyService.showError("Send friend request failed", err);
                }
            );
        };


        $scope.getFriendRequests = function() {
            profileService.getFriendRequests(
                function success(data) {
                    $scope.pendingRequest = data
                    $("#frienadRequestsOverlay").show();
                    $("#frienadRequestsOverlay").attr("data-t",0);
                },
                function error(err) {
                    notifyService.showError("get friend requests request failed", err);
                }
            );
        };

        $scope.acceptFriendRequest = function(id) {
            profileService.acceptFriendRequest(id,
                function success(data) {
                    notifyService.showInfo("Friend request successfully accepted");
                },
                function error(err) {
                    notifyService.showError("Accept friend request failed", err);
                }
            );
        };

        $scope.cancelFriendRequest = function(id) {
            profileService.cancelFriendRequest(id,
                function success(data) {
                    notifyService.showInfo("Friend request successfully canceled");
                },
                function error(err) {
                    notifyService.showError("Cancel friend request failed", err);
                }
            );
        };

        $scope.getOwnFriendsPreviw = function() {
            profileService.getOwnFriendsPreviw(
                function success(data) {
                    $scope.ownFriends = data;
                },
                function error(err) {
                    notifyService.showError("get own friends preview failed", err);
                }
            );
        };

        $scope.getAllOwnFriends = function() {
            profileService.getAllOwnFriends(
                function success(data) {
                    $scope.allOwnFriends = data;
                },
                function error(err) {
                    notifyService.showError("get all friend preview request failed", err);
                }
            );
        };


       $scope.getUserPreviewData = function(id) {
            profileService.getUserPreviewData(id,
                function success(data) {
                    $scope.userPreview = data;
                },
                function error(err) {
                    notifyService.showError("get all friend preview request failed", err);
                }
            );
        };


        $scope.feed = function() {
            if ($scope.busy){
                return;
            }

            $scope.busy = true;
            profileService.getFeed(10, feedPosition,
                function success(data) {
                    $scope.feedPosts = $scope.feedPosts.concat(data);
                    if($scope.feedPosts.length > 0){
                        feedPosition = $scope.feedPosts[$scope.feedPosts.length - 1].id;
                    }
                    $scope.busy = false;
                },
                function error(err) {
                    notifyService.showError("Feed  failed", err);
                }
            );
        };

    }
);


