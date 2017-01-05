/**
 * Created by Jordan on 10/27/2016.
 */
'use strict';

angular.module('myApp')
    .controller('DashboardCtrl', ['$scope', '$http', '$rootScope', DashboardController]);

function DashboardController($scope, $http, $rootScope) {
    
    console.log("Dashboard here");
    
}