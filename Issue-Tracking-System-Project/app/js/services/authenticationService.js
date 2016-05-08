"use strict";

app.factory('authentication',
    function () {
        var key = 'user';

        function saveUserToken(data) {
            localStorage.setItem(key, data);
        }

        function getUserToken() {
            var token = JSON.parse(localStorage.getItem(key));
            if (!token) {
                return false;
            }
            return token.data;
        }

        function getUserHeadersStorage() {
            var headers = {};

            var userToken = getUserToken();
            if (userToken) {
                headers.Authorization = 'Bearer ' + userToken.access_token;
            }
            return headers;
        }

        function clearUserStorage() {
            localStorage.clear();
        }

        return {
            saveUserStorage: saveUserToken,
            getUser: getUserToken,
            getUserHeaderStorage: getUserHeadersStorage,
            clearUserStorage: clearUserStorage
        }
    });