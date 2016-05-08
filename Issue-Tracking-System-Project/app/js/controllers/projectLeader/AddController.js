"use strict";

app.controller('AddController',
    ['$scope', '$location', 'authentication', 'notifyService', 'userService', 'issueService', 'projectService',
        function ($scope, $location, authentication, notifyService, userService, issueService, projectService) {
            var isLogged = authentication.getUser();
            if (!isLogged) {
                notifyService.showError('Please login first.');
                $location.path('/');
            }
            $scope.addIssue = function (issue) {
                var data = {
                    Title: issue.Title,
                    Description: issue.Description,
                    DueDate: issue.DueDate,
                    ProjectId: parseInt(issue.ProjectId),
                    AssigneeId: issue.AssigneeId,
                    PriorityId: parseInt(issue.PriorityId),
                    Labels: []
                };
                issueService.addIssue(data).then(function (success) {

                    notifyService.showSuccess('You add successfully issue:' + success.data.Title);
                    $location.path('/projects')
                }, function (error) {
                    notifyService.showError('', error.data);
                });
            };

            userService.userInfo().then(function (success) {
                projectService.getProjectByLeadId(success.data.Id).then(function (success) {
                    $scope.projectsData = success.data;
                })
            });


            userService.getAllUsersByFilter().then(function (users) {
                $scope.usersName = users.data;
            }, function (error) {
                notifyService.showError('', error.data)
            })


        }
    ]);
var projectData = [];