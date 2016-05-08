"use strict";

app.controller('EditProjectController', ['$scope', '$location', '$route', 'userService', 'projectService', 'authentication', 'notifyService',
    function ($scope, $location, $route, userService, projectService, authentication, notifyService) {
        var isLogged = authentication.getUser();
        if (!isLogged) {
            notifyService.showError('Please login first.');
            $location.path('/');
        }
        $scope.paramsEdit = params;
        $scope.projectId = function (id) {
            $location.path('/projects/' + id + '/edit');
            projectService.getProjectById(id).then(function (success) {
                params = success.data;
                $route.reload();
            });
        };

        $scope.editProject = function (projectData, oldProjectData) {
            var data = {};
            if (projectData !== undefined) {
                data = projectData;

            }
            if (!data.Name) {
                data.Name = oldProjectData.Name;

            }
            if (!data.Description) {
                data.Description = oldProjectData.Description;
            }
            if (!data.labels) {
                data.labels = [];
                var label = oldProjectData.Labels;
                for (var i = 0; i < label.length; i++) {
                    data.labels.push({Name: label[i].Name});
                }
            } else {
                label = projectData.labels.split(', ');
                data.labels = [];
                for (i = 0; i < label.length; i++) {
                    data.labels.push({Name: label[i]});
                }
            }
            if (!data.priorities) {
                data.priorities = [];
                var priority = oldProjectData.Priorities;
                for (i = 0; i < priority.length; i++) {
                    data.priorities.push({Name: priority[i].Name});
                }
            } else {

                priority = projectData.priorities.split(', ');
                data.priorities = [];
                for (i = 0; i < priority.length; i++) {
                    data.priorities.push({Name: priority[i]});
                }
            }
            if (!data.LeadId) {
                data.LeadId = oldProjectData.Lead.Id
            }
            projectService.editProject(data, oldProjectData.Id).then(function (success) {
                notifyService.showSuccess('You successfully edit ' + success.data.Name);
                $location.path('/');
            }, function (error) {
                notifyService.showError('', error.data);
            })
        };

        userService.getAllUsersByFilter().then(function (users) {
            $scope.usersName = users.data;

        }, function (error) {
            notifyService.showError('', error.data)
        });

    }]);
var params;