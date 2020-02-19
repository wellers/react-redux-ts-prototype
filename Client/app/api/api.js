"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Actions = require("../actions/actions");
var Types = require("../types/contacts");
var requests_1 = require("../core/requests");
exports.fetchContacts = function (search) { return function (dispatch) {
    dispatch(Actions.requestContacts(search.pageNumber));
    return requests_1.postRequest("App/Contacts/Api/GetContacts", search)
        .then(function (response) {
        if (response.hasError) {
            return dispatch(receiveError(response.error));
        }
        return dispatch(Actions.receiveContacts(response.value));
    });
}; };
function receiveError(error) {
    return {
        type: Types.RECEIVE_SERVER_ERROR,
        error: error
    };
}
exports.receiveError = receiveError;
//# sourceMappingURL=api.js.map