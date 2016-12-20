/**
 * Created by Jordan on 10/7/2016.
 */

'use strict';

angular.module('myApp')
    .controller('HomeCtrl', ['$scope', '$http', HomeController]);

function HomeController($scope, $http) {
    console.log("I'm Home");


}