'use strict';

app.controller('CommentController',
    function ($scope, $rootScope, $location, postService, $filter, userService, notifyService, $routeParams, commentService) {
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
            commentService.submitCommentToPost(id,text,
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
            });
        }

        $scope.showAllComments = function  (id) {
            postService.showAllComments(id,
            function success(data) {
                 //todo
                    
            },
            function error(err) {
                notifyService.showError("Comment failed", err);
            });
        }
        
        $scope.likeComment = function  (postId,commentId,thisPost) {
            commentService.likeComment(postId,commentId,
            function success(data) {
                thisPost.comment.likesCount++;
                thisPost.comment.liked = true;
            },
            function error(err) {
                notifyService.showError("Like failed", err);
            });
        }

        $scope.dislikeComment = function  (postId,commentId,thisPost) {
            commentService.dislikeComment(postId,commentId,
            function success(data) {
                thisPost.comment.likesCount--;
                thisPost.comment.liked = false;
            },
            function error(err) {
                notifyService.showError("DisLike failed", err);
            });
        }


    }
);
