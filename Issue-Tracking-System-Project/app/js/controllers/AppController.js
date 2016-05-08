"use strict";

app.controller('AppController',
    ['$scope', '$location', 'userService', 'authentication', 'notifyService',
        function ($scope, $location, userService, authentication, notifyService) {
            $scope.authService = userService;
            $scope.logout = function () {
                userService.logout().then(function () {
                    authentication.clearUserStorage();
                    notifyService.showSuccess('You successfully logout');
                    $location.path('/');
                })
            }

        }]);