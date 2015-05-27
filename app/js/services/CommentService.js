'use strict';

app.factory('commentService',
    function ( $http,  baseServiceUrl, userService) {
        return {
            submitCommentToPost : function(id, text, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/posts/' + id + '/comments',
                    data: {
                        commentContent: text
                    },
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            showAllComments : function(id, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/posts/' + id + '/comments',
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            likeComment : function(postId, commentId, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId + '/likes',
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            deleteComment : function(postId, commentId, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId  ,
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },


            dislikeComment : function(postId, commentId, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId + '/likes',
                    headers: {
                        'Authorization' : 'Bearer ' + userService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            editComment : function(postId, commentId, content, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/Posts/' + postId + '/comments/' + commentId ,
                    data: {
                        commentContent: content
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
