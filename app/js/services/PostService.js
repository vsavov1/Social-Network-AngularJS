'use strict';

app.factory('postService',
    function ( $http,  baseServiceUrl, userService) {
        return {
            getAllPosts : function(username, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + username + "/wall?StartPostId=&PageSize=5",
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            makeNewPost : function(content, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/posts',
                    postContent : content,
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            }
        }
    }
);
