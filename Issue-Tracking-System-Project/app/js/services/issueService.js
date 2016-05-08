"use strict";

app.factory('issueService', ['$http', 'baseServiceUrl', 'authentication',
    function ($http, baseServiceUrl, authentication) {

        function getIssuesById(projectId) {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'GET',
                async: true,
                url: baseServiceUrl + 'issues/' + projectId,
                headers: header
            };
            return $http(request);
        }

        function getAllIssues() {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'GET',
                async: true,
                url: baseServiceUrl + 'issues?filter=&orderBy=DueDate desc, IssueKey&pageSize=2000&pageNumber=1',
                headers: header
            };
            return $http(request);
        }

        function getByFilterIssuesById(projectName) {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'GET',
                async: true,
                url: baseServiceUrl + 'issues?filter=Projects.Name.contains("' + projectName + '")',
                headers: header
            };
            return $http(request);
        }

        function getMyIssues(pageNumber) {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'GET',
                async: true,
                url: baseServiceUrl + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=20&pageNumber=1',
                headers: header
            };
            return $http(request);
        }

        function editIssuesById(data, Id) {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'PUT',
                url: baseServiceUrl + 'issues/' + Id,
                data: data,
                headers: header
            };
            return $http(request);
        }

        function getIssueComments(Id) {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'issues/' + Id + '/comments',
                headers: header
            };
            return $http(request);
        }

        function addIssueComment(Id, data) {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'issues/' + Id + '/comments',
                data: {'Text': data},
                headers: header
            };
            return $http(request);
        }

        function changeStatus(Id, statusId) {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'PUT',
                url: baseServiceUrl + 'issues/' + Id + '/changestatus?statusid=' + statusId,
                headers: header
            };
            return $http(request);
        }

        function addIssue(issue) {
            var header = authentication.getUserHeaderStorage();
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'issues/',
                data: issue,
                headers: header
            };
            return $http(request);
        }

        return {
            getIssuesById: getIssuesById,
            getAllIssues: getAllIssues,
            getByFilterIssues: getByFilterIssuesById,
            getMyIssues: getMyIssues,
            editIssuesById: editIssuesById,
            changeStatus: changeStatus,
            addIssue: addIssue,
            getIssueComments: getIssueComments,
            addIssueComment: addIssueComment
        }
    }]);