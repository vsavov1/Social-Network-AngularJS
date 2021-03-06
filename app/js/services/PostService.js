'use strict';

app.factory('postService',
    function ( $http,  baseServiceUrl, userService) {
        return {
            getAllPosts : function(size, wallPositon, username, success, error) {
                url: baseServiceUrl + '/api/me/feed?StartPostId' 
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + username + '/wall?StartPostId' 
                        + (wallPositon ? "=" + wallPositon : "") + "&PageSize=" + size,
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

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            likePost : function(id, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/Posts/' + id +'/likes',
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            dislikePost : function(id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/Posts/' + id +'/likes',
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            deletePost : function(id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/Posts/' + id ,
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            }, 

            editPost : function(id, content, success, error) {
                console.log(content);
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/Posts/' + id ,
                    data: {
                        postContent: content
                    },
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
