/**
 * Created by Corey Weber on 2016-10-02.
 */
angular.module('myApp')
    .factory('LoginService', ['$q', '$http', '$window', '$rootScope', function ($q, $http, $window, $rootScope) {

        var service = {};

        service.login = function (email, password) {
            var data = {email: email, password: password};
            var defer = $q.defer();

            $http({
                url: "../databases/login/login.php",
                data: data,
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).success(function (response) {
                if (response === "failed") {
                    return defer.resolve(response);
                } else {
                    $window.localStorage.token = response.jwt;
                    $window.location.href = '#/home';
                    return defer.resolve(response);

                    // $scope.loading = false;*/

                }
            }).error(function () {
                return defer.reject();
            });

            return defer.promise;
            //add to local storage
        };
        service.authUser = function () {
            var defer = $q.defer();
            var creds = {toke:$window.localStorage.token};
            $http({
                url: "../databases/login/authenticate.php",
                data: creds,
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).success(function () {
                $rootScope.isLoggedin = true;
                return defer.resolve();
            }).error(function(){
                $rootScope.isLoggedin = false;
                return defer.reject("Bad Credentials");
                //$window.location.href = '#/login';
            });
           
            return defer.promise;
        };

        service.userRegister = function (formObject) {
            var defer = $q.defer();
            $http({
                url: "../databases/login/signup.php",
                data: formObject,
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).success(function (response) {
                console.log(response);
                if (response === "Failed") {
                    console.log("Done Fucked Up");
                    return defer.reject();
                } else {
                    console.log("We Good");
                    $window.localStorage.token = response.jwt;
                    $window.location.href = '#/dashboard';
                    return defer.resolve();
                    /* $window.localStorage.token = response.jwt;
                     $scope.loading = false;
                     $window.location.href = '#/admin';*/
                }
            });
            return defer.promise;
        };

        service.storeUser = function (user) {
            localStorage.setItem('user', JSON.stringify(user));
        };

        service.getUser = function () {
            var user = localStorage.getItem('user');
            return JSON.parse(user);
        };
        

        service.isLoggedIn = function () {

            var user = service.getUser();
            console.log(user);
            if (user != null) {
                return true;
            } else {
                return false;
            }
        };
        return service;

    }]);