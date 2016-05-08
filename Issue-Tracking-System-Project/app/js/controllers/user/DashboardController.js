"use strict";

app.controller('DashboardController',
    ['$scope', '$timeout', 'issueService',
        function ($scope, $timeout, issueService) {
            $scope.readyDownload = false;
            var result;
            issueService.getMyIssues().then(function (data) {
                result = data.data.Issues;
            });

            $timeout(function () {
                $scope.issues = result;
                $scope.pageTitle = 'Dashboard';
                $scope.readyDownload = true;
            }, 5000)

        }]);