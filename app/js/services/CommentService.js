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



        }
    }
);
