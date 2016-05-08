"use strict";

app.controller('IssueController', ['$scope', '$location', '$route', 'notifyService', 'authentication', 'issueService',
    function ($scope, $location, $route, notifyService, authentication, issueService) {
        $scope.pageTitle = 'Issue Page';
        $scope.readyIssueDownload = false;
        $scope.promiseIssue = issueProject;
        $scope.allComments = comment;
        var isLogged = authentication.getUser();
        if (!isLogged) {
            notifyService.showError('Please login first.');
            $location.path('/');
        }
        $scope.issueParams = function (id) {
            $location.path('/issue/' + id);
            issueService.getIssuesById(id).then(function (issue) {

                $scope.readyIssueDownload = true;
                issueProject = issue.data;
                $route.reload();
            });
            issueService.getIssueComments(id).then(function (comments) {
                comment = comments.data;
                $route.reload();
            });
        };

    }]);
var issueProject = {};
var comment = {};