'use strict';

app.factory('profileService',
    function ($http, baseServiceUrl) {
        return {
            changePassword : function(userData, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me/ChangePassword',
                    data: userData,
                    headers: {
                        'Authorization' : 'Bearer ' + this.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            editProfile : function(userData, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me',
                    data: userData,
                    headers: {
                        'Authorization' : 'Bearer ' + this.Authorization()
                    }
                };

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
