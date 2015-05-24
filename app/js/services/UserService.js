'use strict';

app.factory('userService',
    function ($http, baseServiceUrl) {
        return {
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/login',
                    data: userData
                };
                
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            logout: function(success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/logout',
                    headers: {
                        'Authorization' : 'Bearer ' + this.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    delete sessionStorage['currentUser'];
                    success(data);
                }).error(error);
            },

            getDataAboutMe :  function (success, error) {
                var request = {
                    method: 'get',
                    url: baseServiceUrl + '/api/me',
                    headers: {
                        'Authorization' : 'Bearer ' + this.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            saveDataAboutMe : function  (data) {
                sessionStorage['name'] = data.name;
                sessionStorage['email'] = data.email;
                sessionStorage['profileImageData'] = data.profileImageData;
                sessionStorage['coverImageData'] = data.coverImageData;
                sessionStorage['gender'] = data.gender;
            },

            getCoverPicture : function () {
                return  sessionStorage['coverImageData'];
            },

            getProfilePicture : function () {
                return  sessionStorage['profileImageData'];
            },

            getUserGender : function () {
                return  sessionStorage['gender'];
            },

            getUserFullName : function () {
                return  sessionStorage['name'];
            },

            getUserEmail : function () {
                return  sessionStorage['email'];
            },

            getUserName : function () {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    var jsonObject = JSON.parse(sessionStorage['currentUser'])
                    return jsonObject.userName;
                }
            },

            Authorization : function () {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    var jsonObject = JSON.parse(sessionStorage['currentUser'])
                    return jsonObject.access_token;
                }
            },

            isLoggedIn : function() {
                return sessionStorage['currentUser'] != undefined;
            },

            searchUser : function(searchTerm, success, error) {
                if (searchTerm.length <= 0) {
                    return;
                }

                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/search?searchTerm=' + searchTerm,
                    headers: {
                        'Authorization' : 'Bearer ' + this.Authorization()
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            

            getUserWall : function(username, success, error) {
                var userObject = JSON.parse(sessionStorage['currentUser']);
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + username,
                    headers: {
                        'Authorization' : 'Bearer ' + userObject.access_token
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            },

            getUserWallFriendsPreveiw : function(username, success, error) {
                var userObject = JSON.parse(sessionStorage['currentUser']);
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + "321321" + "/friends/preview",
                    headers: {
                        'Authorization' : 'Bearer ' + userObject.access_token
                    }
                };

                $http(request).success(function(data) {
                    success(data);
                }).error(error);
            }
        }
    }
);
