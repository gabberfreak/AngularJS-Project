'use strict';

app.factory('notifyService',
    function () {
        function showSuccess(msg) {
            noty({
                text: msg,
                type: 'success',
                layout: 'topCenter',
                timeout: 1000}
            );
        }
        function showError(msg, serverError) {
            // Collect errors to display from the server response
            var errors = [];
            if (serverError && serverError.Message) {
                errors.push(serverError.Message);
            }
            if (serverError && serverError.error_description) {
                var modelStateErrors = serverError.error_description;
                errors.push(modelStateErrors);
            }
            if (errors.length > 0) {
                msg = msg + "<br>" + errors.join("<br>");
            }
            noty({
                text: msg,
                type: 'error',
                layout: 'topCenter',
                timeout: 5000}
            );
        }
        return {
            showSuccess: showSuccess,
            showError: showError
        }
    }
);