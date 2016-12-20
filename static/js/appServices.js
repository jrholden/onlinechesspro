/**
 * Created by Corey Weber on 2016-10-03.
 */
angular.module('myApp')
    .factory('MailService', ['$q', '$http', '$rootScope', function ($q, $http, $rootScope) {

        var service = {};

        service.bookingUserEmail = function (service, lawyerName, address, price) {
            return $http({
                method: 'POST',
                url: '/api/send_user_book',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify({service: service, lawyerName: lawyerName, address: address, price: price})
            })
        };

        service.bookingLawyerEmail = function (name,address,email,phone,availability,service) {
            return $http({
                method: 'POST',
                url: '/api/send_lawyer_book',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify({name: name,address: address,email: email,phone:phone, availability: availability, service:service})
            })
        };

        service.completedJobEmail = function (passObject) {
            console.log("Service: completedServiceEmail");
            return $http({
                method: 'POST',
                url: '/api/send_complete_job',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(passObject)
            })
        };

        service.lawyerSignup = function (name, email, url) {
            console.log("Service: lawyerSignup");
            return $http({
                method: 'POST',
                url: '/api/send_lawyer_signup',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify({name: name, email: email, url: url})
            })
        };

        service.referralEmail = function (email, text) {
            console.log("Service: referralEmail");
            var user = $rootScope.userObject;
            return $http({
                method: 'POST',
                url: '/api/send_referral',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify({name:user.name, email: email, text: text})
            })
        };

        return service;

    }]);