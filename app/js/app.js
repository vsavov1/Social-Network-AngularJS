'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net');

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

    $routeProvider.otherwise({
        redirectTo: '/' 
    });

});

// app.run(function ($rootScope, $location, userService) {
//   $rootScope.$on('$locationChangeStart', function (event) {
//     if ($location.path().indexOf("/user/") != -1 && !userService.isLoggedIn()) {
//       // Authorization check: anonymous site visitors cannot access user routes
//       $location.path("/");
//     }
//   });
// });
