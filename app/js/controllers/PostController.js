'use strict';

app.controller('PostController',
    function ($scope, $rootScope, $location, postService, $filter, userService, notifyService, $routeParams) {
        var wallPosition;
        $scope.wallPosts = [];
        $scope.busy = false;
        $scope.postComment = true;

        if ($scope.wallPosts.length > 0) {
            $scope.$watch(wallPosts.date, function (val) {
                $scope.result = $filter('date')(new Date(), val);
            }, true);
        }

        $scope.getWallPosts = function() {
            if ($scope.busy){
                return;
            }

            $scope.busy = true;
            postService.getAllPosts(10, wallPosition,$routeParams.id,
            function success(data) {
                    $scope.wallPosts = $scope.wallPosts.concat(data);
                    if($scope.wallPosts.length > 0){
                        wallPosition = $scope.wallPosts[$scope.wallPosts.length - 1].id;
                    }
                    $scope.busy = false;

                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };

        $scope.makeNewPost = function(makePostContent) {
            postService.makeNewPost(makePostContent,$routeParams.id,
            function success(data) {
                    notifyService.showInfo("Post successfully");
                    setTimeout(function(){
                        window.location.reload();
                    }, 700);
                },
                function error(err) {
                    notifyService.showError("Post failed", err);
                }
            );
        };

        $scope.likePost = function  (id, thisPost) {
            postService.likePost(id,
            function success(data) {
                    thisPost.post.likesCount++;
                    thisPost.post.liked = true;
                },
                function error(err) {
                    notifyService.showError("Like failed", err);
                }
            );
        }

        $scope.dislikePost = function  (id, thisPost) {
            postService.dislikePost(id,
            function success(data) {
                    thisPost.post.likesCount--;
                    thisPost.post.liked = false;
                },
                function error(err) {
                    notifyService.showError("Like failed", err);
                }
            );
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
