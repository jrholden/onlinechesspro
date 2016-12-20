'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ui.bootstrap'
])
    .config(function ($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404-page');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html?v=' + window.app_version,
                controller: 'HomeCtrl'
            })
            .state('play', {
                url: '/play',
                templateUrl: 'play/play.html?v=' + window.app_version,
                controller: 'PlayCtrl'
            })
            .state('login', {
                title: 'Login',
                url: '/login',
                templateUrl: '/login/login.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })
            .state('signup', {
                title: 'SignUp',
                url: '/signup',
                templateUrl: '/signUp/signUp.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })
            .state('dashboard', {
                title: 'Dashboard',
                url: '/dashboard',
                templateUrl: '/dashboard/dashboard.html?v=' + window.app_version,
                controller: 'DashboardCtrl',
                resolve: {
                    auth: function (LoginService) {
                        return LoginService.authUser();
                    }
                }
            })

    });



