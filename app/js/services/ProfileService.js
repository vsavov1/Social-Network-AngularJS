'use strict';

app.factory('profileService',
    function ($http, baseServiceUrl) {
        return {
            editProfile: function(userData, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me',
                    data: userData,
                    headers: {
                        'Authorization' : 'Bearer ' + this.Authorization()
                    }
                };
                console.log(userData);
                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },
            
            Authorization : function () {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    var jsonObject = JSON.parse(sessionStorage['currentUser'])
                    return jsonObject.access_token;
                }
            }

        }
    }
);
