"use strict";

app.controller('AddCommentController',
    ['$scope', '$location', 'issueService', 'notifyService',
        function ($scope, $location, issueService, notifyService) {
            $scope.addComment = function (id, comment) {
                issueService.addIssueComment(id, comment).then(function (success) {
                    notifyService.showSuccess('Successfully add comment');
                    $location.path('/');
                })
            }
        }
    ]);