'use strict';

app.factory('userService', ['$http', 'baseServiceUrl', 'authentication',
    function ($http, baseServiceUrl, authentication) {
        var isAdmin = false;

        function login(user) {
            user.grant_type = 'password';
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Token',
                data: 'grant_type=' + user.grant_type +
                '&username=' + user.email +
                '&password=' + user.password,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            };

            return $http(request);
        }

        function register(user) {
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/account/register',
                data: user
            };

            return $http(request);


        }

        function logout() {
            isAdmin = false;
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Account/logout',
                headers: authentication.getUserHeaderStorage()
            };

            return $http(request);
        }

        function getAllUsers() {
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'users',
                headers: authentication.getUserHeaderStorage()
            };

            return $http(request);
        }

        function getAllUsersByFilter() {
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'users?filter=Username.Contains("oracle")',
                headers: authentication.getUserHeaderStorage()
            };

            return $http(request);
        }

        function getCurrentUser() {
            var userToken = authentication.getUser();
            if (userToken) {
                return userToken;
            }
        }

        function makeAdmin(userId) {
            var headerToken = authentication.getUserHeaderStorage();
            var request = {
                method: 'PUT',
                url: baseServiceUrl + 'users/makeadmin',
                data: {'UserId': userId},
                headers: headerToken

            };
            return $http(request);
        }

        function userInfo() {
            var headerToken = authentication.getUserHeaderStorage();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'users/me',
                headers: headerToken
            };

            var promise = $http(request);
            promise.then(function (admin) {
                isAdmin = admin.data;
            });
            return promise;

        }

        function changePassword(changePassword) {
            var headerToken = authentication.getUserHeaderStorage();
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/account/changepassword',
                data: changePassword,
                headers: headerToken
            };

            return $http(request);

        }

        function isAnonymous() {
            return localStorage['user'] == undefined;

        }

        function isLoggedIn() {
            return localStorage['user'] != undefined;

        }

        function setLocalStorageIsNormal() {
            return isLoggedIn() && (!isAdminUser());

        }

        function isNormalUser() {
            return setLocalStorageIsNormal();
        }

        function isLeadProject() {
            var currentUser = getCurrentUser();
            var isLead;
            isLead = !!(currentUser != undefined && currentUser.userName == 'oracle@gmail.bg');
            return isLead;
        }

        function isAdminUser() {
            return !isLeadProject() && isAdmin.isAdmin;
        }

        function getAuthHeaders() {
            authentication.getUserHeaderStorage();
        }

        return {
            login: login,
            register: register,
            logout: logout,
            isAnonymous: isAnonymous,
            isLoggedIn: isLoggedIn,
            isNormalUser: isNormalUser,
            isAdminUser: isAdminUser,
            getAuthHeaders: getAuthHeaders,
            makeAdmin: makeAdmin,
            changePassword: changePassword,
            setLocalStorageIsNormal: setLocalStorageIsNormal,
            isLead: isLeadProject,
            getAllUsers: getAllUsers,
            getAllUsersByFilter: getAllUsersByFilter,
            userInfo: userInfo
        }
    }]);