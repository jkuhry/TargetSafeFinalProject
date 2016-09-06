(function() {
    'use strict';

    // included ngautocomplete for google places api
    var myApp = angular.module('myApp', ['ui.router', 'ngAutocomplete']);

    // information to use ui router, interceptor, and different states
    myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) { 
 
    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/home");
   
    // Now set up the states
    $stateProvider
        .state('home', {
          url: "/home",
          templateUrl: "app/partials/home.html",
          controller: "MainController",
          controllerAs: "vm",
        })     
        .state('search', {
          url: "/search",
          templateUrl: "app/partials/search.html",
          controller: "MainController",
          controllerAs: "vm"
        })
  });
  
  
})();
