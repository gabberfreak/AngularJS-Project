"use strict";

app.controller('RegisterController', ['$scope', '$rootScope', '$location', 'userService', 'authentication', 'notifyService',
    function ($scope, $rootScope, $location, userService, authentication, notifyService) {
        $scope.register = function (user) {
            if (user.password != user.confirmPassword) {
                notifyService.showError('The password and confirm password is not mach!')
            } else {
                userService.register(user).then(function (success) {
                    userService.login(success.config.data).then(function (success) {
                        authentication.saveUserStorage(angular.toJson(success));
                        $location.path('/');
                        var registerMasage = 'You register success.';
                        var welcomeMsg = 'Welcome '+ success.data.userName+'!';
                        notifyService.showSuccess(registerMasage + "</br>" + welcomeMsg)
                    });

                })
            }
        }
    }]);