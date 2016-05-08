"use strict";

app.controller('AdminController', ['$scope', '$timeout', '$location', 'issueService', 'authentication', 'notifyService',
    function ($scope, $timeout, $location, issueService, authentication, notifyService) {
        var isLogged = authentication.getUser();
        if (!isLogged) {
            notifyService.showError('Please login first.');
            $location.path('/');
        }

        $scope.authService = issueService;
        $scope.readyDownload = false;
        var totalCount;
        issueService.getAllIssues().then(function (data) {
            totalCount = data.data.TotalCount;
            $scope.issues = data.data.Issues;

        });

        $timeout(function () {
            $scope.pageTitle = 'Dashboard';
            $scope.readyDownload = true;
        }, 10000)
    }])
;