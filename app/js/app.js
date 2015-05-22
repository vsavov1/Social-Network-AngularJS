'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net');

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        // controller: 'MainController'
    });

        //    $routeProvider.when('/login', {
        //        templateUrl: 'templates/login.html',
        //        controller: 'LoginController'
        //    });

    $routeProvider.otherwise({
        redirectTo: '/' 
    });

});

app.run(function ($rootScope, $location, authService) {
  $rootScope.$on('$locationChangeStart', function (event) {
    if ($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
      // Authorization check: anonymous site visitors cannot access user routes
      $location.path("/");
    }
  });
});
