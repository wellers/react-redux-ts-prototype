"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var SharedTypes_Types_ContactSearch_1 = require("../apitypes/ts/SharedTypes.Types.ContactSearch");
var API = require("../api/api");
var ContactsContainer = /** @class */ (function (_super) {
    __extends(ContactsContainer, _super);
    function ContactsContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            searchTerm: ''
        };
        return _this;
    }
    ContactsContainer.prototype.componentDidMount = function () {
        this._fetchForCurrentCriteria();
    };
    ContactsContainer.prototype._fetchForCurrentCriteria = function (pageNumber) {
        var search = new SharedTypes_Types_ContactSearch_1.ContactSearch({
            searchTerm: (this.state.searchTerm || ''),
            pageNumber: (pageNumber || 1)
        });
        this.props.dispatch(API.fetchContacts(search));
    };
    return ContactsContainer;
}(React.Component));
//# sourceMappingURL=contactsContainer.js.map