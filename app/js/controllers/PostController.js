'use strict';

app.controller('PostController',
    function ($scope, $rootScope, $location, postService, $filter, userService, notifyService, $routeParams) {
        $scope.$watch(posts.date, function (val) {
            $scope.result = $filter('date')(new Date(), val);
        }, true);

        var wallPosition;
        $scope.wallPosts = [];
        $scope.busy = false;
        
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

                    // $scope.posts = data;
                    console.log(data);
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

    }
);
