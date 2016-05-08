'use strict';

var app = angular.module('issueTrackingSystem', ['ngRoute', 'angular.filter', 'angularUtils.directives.dirPagination']);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 5);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/profile/password', {
        templateUrl: 'templates/user/change-password.html',
        controller: 'ProfilePasswordController'
    });

    $routeProvider.when('/projects', {
        templateUrl: 'templates/user/list-projects.html',
        controller: 'ProjectsController'
    });

    $routeProvider.when('/issue/:id', {
        templateUrl: 'templates/leader/issue.html',
        controller: 'IssueController'
    });

    $routeProvider.when('/projects/:id/add-issue', {
        templateUrl: 'templates/leader/add-issue.html',
        controller: 'AddController'
    });

    $routeProvider.when('/admin/panel', {
        templateUrl: 'templates/admin/panel.html',
        controller: 'AdminPanelController'
    });

    $routeProvider.when('/make/admin', {
        templateUrl: 'templates/admin/make.html',
        controller: 'MakeAdminController'
    });

    $routeProvider.when('/projects/add', {
        templateUrl: 'templates/admin/add-projects.html',
        controller: 'AddProjectController'
    });

    $routeProvider.when('/projects/:id/edit', {
        templateUrl: 'templates/admin/edit-project.html',
        controller: 'EditProjectController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);
