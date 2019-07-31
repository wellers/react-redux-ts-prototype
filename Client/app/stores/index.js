"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducers_1 = require("../reducers/reducers");
exports.rootReducer = redux_1.combineReducers({
    contacts: reducers_1.contacts
});
//# sourceMappingURL=index.js.map