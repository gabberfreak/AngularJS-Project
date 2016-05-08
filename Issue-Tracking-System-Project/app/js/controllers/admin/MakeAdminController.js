"use strict";

app.controller('MakeAdminController', ['$scope', '$timeout', '$location', 'userService', 'authentication', 'notifyService',
    function ($scope, $timeout, $location, userService, authentication, notifyService) {
        var isLogged = authentication.getUser();
        if (!isLogged) {
            notifyService.showError('Please login first.');
            $location.path('/');
        }

        userService.getAllUsers().then(function (success) {
            $scope.usernames = success.data;
        });
        $scope.selectedUserId = function (id) {
            userService.makeAdmin(id).then(function () {
                notifyService.showSuccess('This user now is admin');
            }, function (error) {
                notifyService.showError('', error.data);
            })
        }
    }]);