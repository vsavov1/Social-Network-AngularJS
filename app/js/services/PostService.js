'use strict';

app.factory('postService',
    function ($http, baseServiceUrl, profileService) {
        return {
            getAllPosts : function(username, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + username + "/wall?StartPostId=&PageSize=5",
                    headers: {
                        'Authorization' : 'Bearer ' + profileService.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            }
        }
    }
);
