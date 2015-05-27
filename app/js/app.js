'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource','infinite-scroll']);

app.constant(
  'baseServiceUrl', 'http://softuni-social-network.azurewebsites.net');

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'UserController'
    });

   $routeProvider.when('/profile', {
       templateUrl: 'templates/editProfile.html',
       controller: 'ProfileController'
    });

    $routeProvider.when('/profile/password', {
       templateUrl: 'templates/changePassword.html',
       controller: 'ProfileController'
    });

    $routeProvider.when('/users/:id', {
       templateUrl: 'templates/userWall.html',
       controller: 'UserController'
    });

    $routeProvider.when('/users/:id/friends', {
       templateUrl: 'templates/friends.html',
       controller: 'UserController'
    });

    $routeProvider.when('/api/me/friends', {
       templateUrl: 'templates/myFriends.html',
       controller: 'ProfileController'
    });

    $routeProvider.otherwise({
        redirectTo: '/' 
    });


});

app.run(function ($rootScope, $location, userService, notifyService) {
    $rootScope.$on('$routeChangeStart', function (event) {
        if (!userService.isLoggedIn() ) {
            $location.path("/");
        }
    });
});
