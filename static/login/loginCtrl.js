'use strict';

angular.module('myApp')
    .controller('LoginCtrl', ['$scope', '$http', '$rootScope', 'LoginService', LoginController]);

function LoginController($scope, $http, $rootScope, LoginService) {
    console.log("I'm Login");
    $scope.isBad = false;
    $scope.login = function (username, password) {

        LoginService.login(username, password).then(function (data) {
                if(data === "failed"){
                    $scope.isBad = true;
                    console.log("Message should appear");
                }else{
                    $scope.isBad = false;
                    $rootScope.isLoggedin = true;
                }
        });
    };
    $scope.auth = function(){
        LoginService.authUser();
    };
    $scope.badLogin = function(){
        return $scope.isBad;
    };
    $scope.signup = function () {
        var object = {username: $scope.username, password: $scope.password};
        LoginService.userRegister(object);
        $rootScope.isLoggedin = true;
    };

    $scope.loggedIn = function () {
        return $rootScope.isLoggedin;
    };

    $scope.goToDash = function () {

       
    };

    $scope.logout = function () {
        $rootScope.isLoggedin = false;
        localStorage.clear();
        window.location.assign('/#/');
    }
}