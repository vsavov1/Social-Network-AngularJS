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

        $scope.modalShown = false;
        
        $scope.toggleModal = function() {
            $scope.editPostData = "";
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.showCommentTextArea = function () {
            $scope.postComment = $scope.postComment === false ? true: false;
        }

        $scope.deleteComment = function  (postId,commentId,thisPost) {
            commentService.deleteComment(postId,commentId,
            function success(data) {
                notifyService.showInfo("Comment successfully deleted");
            },
            function error(err) {
                notifyService.showError("Like failed", err);
            });
        }

        $scope.submitCommentToPost = function  (id, content) {
            var text = content;
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

        $scope.showAllComments = function  (thisComment, postId) {
            commentService.showAllComments(postId,
            function success(data) {
                thisComment.post.comments = data;
            },
            function error(err) {
                notifyService.showError("Comment failed", err);
            });
        }
        
        $scope.likeComment = function  (postId,commentId, thisComment) {
            commentService.likeComment(postId,commentId,
            function success(data) {
                thisComment.comment.likesCount++;
                thisComment.comment.liked = true;
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

        $scope.editComment = function  (postId, commentId, content) {
            commentService.editComment(postId, commentId, content,
            function success(data) {
                    notifyService.showInfo("Comment successfully edited");
                    setTimeout(function(){
                        window.location.reload();
                    }, 500);
                },
                function error(err) {
                    notifyService.showError("Comment failed", err);
                }
            );
        }
    }
);
