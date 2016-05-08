"use strict";

app.controller('AdminProfileController', ['$location', 'authentication', 'notifyService',
    function ($scope, authentication, notifyService) {
        var isLogged = authentication.getUser();
        if (!isLogged) {
            notifyService.showError('Please login first.');
            $location.path('/');
        }
    }]);