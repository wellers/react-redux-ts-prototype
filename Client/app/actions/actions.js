"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types = require("../types/contacts");
var SharedTypes_Types_GetContactsResponse_1 = require("../apitypes/ts/SharedTypes.Types.GetContactsResponse");
function requestContacts(pageNumber) {
    return {
        type: Types.REQUEST_CONTACTS,
        pageNumber: pageNumber
    };
}
exports.requestContacts = requestContacts;
function receiveContacts(response) {
    var data = SharedTypes_Types_GetContactsResponse_1.GetContactsResponse.fromJS(response);
    return {
        type: Types.RECEIVE_CONTACTS,
        results: data.results,
        totalResultsCount: data.totalResultCount,
        resultsPerPage: data.resultsPerPage
    };
}
exports.receiveContacts = receiveContacts;
//# sourceMappingURL=actions.js.map