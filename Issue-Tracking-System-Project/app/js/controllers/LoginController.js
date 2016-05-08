"use strict";

app.controller('LoginController', ['$scope', '$rootScope', '$location', 'userService', 'authentication', 'notifyService',
    function ($scope, $rootScope, $location, userService, authentication, notifyService) {
        $scope.login = function (user) {
            userService.login(user).then(function (success) {
                authentication.saveUserStorage(angular.toJson(success));
                userService.setLocalStorageIsNormal();
                userService.userInfo();
                notifyService.showSuccess('Success Login' + 'Welcome ' + success.data.userName +' !');
                $location.path('/')
            }, function (error) {
                notifyService.showError('Login failed:', error.data)
            })
        }
    }]);