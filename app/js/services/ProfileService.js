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

             
            sendFriendRequest : function(username, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/me/requests/' + username,
                    headers: {
                        'Authorization' : 'Bearer ' + this.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            cancelFriendRequest : function(id, success, error) {
                var userObject = JSON.parse(sessionStorage['currentUser']);
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me/requests/' + id + "?status=rejected",
                    headers: {
                        'Authorization' : 'Bearer ' + userObject.access_token
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },


            acceptFriendRequest : function(id, success, error) {
                var userObject = JSON.parse(sessionStorage['currentUser']);
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me/requests/' + id + "?status=approved",
                    headers: {
                        'Authorization' : 'Bearer ' + userObject.access_token
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },


            getFriendRequests : function(success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/me/requests/',
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
