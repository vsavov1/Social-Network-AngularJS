'use strict';

app.controller('CommentController',
    function ($scope, $rootScope, $location, postService, $filter, userService, notifyService, $routeParams) {
        $scope.postComment = true;
        $scope.userData = {
            name : userService.getUserFullName(),
            email : userService.getUserEmail(),
            gender : userService.getUserGender(),
            profileImageData : userService.getProfilePicture(),
            coverImageData : userService.getCoverPicture(),
            currentUsername : userService.getUserName()
        }

        $scope.showCommentTextArea = function () {
            $scope.postComment = $scope.postComment === false ? true: false;
        }

        $scope.submitCommentToPost = function  (id) {
            var text = $scope.postCommentText;
            postService.submitCommentToPost(id,text,
            function success(data) {
                    notifyService.showInfo("Comment successfully");
                    $scope.postCommentText = "";
                    $scope.postComment = $scope.postComment === false ? true: false;
                    setTimeout(function(){
                        window.location.reload();
                    }, 500);

                },
                function error(err) {
                    notifyService.showError("Comment failed", err);
                }
            );
        }

        

        $scope.showAllComments = function  (id) {
            postService.showAllComments(id,
            function success(data) {
                 //todo
                    
                },
                function error(err) {
                    notifyService.showError("Comment failed", err);
                }
            );
        }
    }
);
