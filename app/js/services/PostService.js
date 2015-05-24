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

            makeNewPost : function(content, username, success, error) {

                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/posts',
                    data: {
                        postContent : content,
                        username : username
                    },
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };
                console.log(username);
                console.log(userService.Authorization());

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            }
        }
    }
);
