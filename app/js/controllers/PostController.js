'use strict';

app.controller('PostController',
    function ($scope, $rootScope, $location, postService,$filter, userService, notifyService, $routeParams) {
        $scope.$watch(posts.date, function (val) {
            $scope.result = $filter('date')(new Date(), val);
        }, true);
        
        $scope.getWallPosts = function() {
            postService.getAllPosts($routeParams.id,
             function success(data) {
                    $scope.posts = data;
                    console.log(data);
                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };

    }
);
