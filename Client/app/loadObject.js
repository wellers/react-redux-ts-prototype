"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
var LoadObject = /** @class */ (function () {
    function LoadObject(operation, hasValue, value, error) {
        this._operation = operation;
        this._hasValue = hasValue;
        this._value = value;
        this._error = error;
    }
    Object.defineProperty(LoadObject.prototype, "operation", {
        get: function () {
            return this._operation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "value", {
        get: function () {
            if (!this.hasValue) {
                throw new Error('Expected load object to have a value set');
            }
            return this._value; // Inferred as defined from "hasValue"
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "error", {
        get: function () {
            if (!this.hasError) {
                throw new Error('Expected load object to have an error set');
            }
            return this._error; // Inferred as defined from "hasError"
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "hasOperation", {
        get: function () {
            return (this._operation != "None" /* None */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "hasValue", {
        get: function () {
            return this._hasValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "hasError", {
        get: function () {
            return !!this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "isEmpty", {
        get: function () {
            return !this.hasValue && !this.hasOperation && !this.hasError;
        },
        enumerable: true,
        configurable: true
    });
    LoadObject.prototype.withOperation = function (operation) {
        return new LoadObject(operation, this.hasValue, this._value, this._error);
    };
    LoadObject.prototype.withValue = function (value) {
        return new LoadObject(this.operation, true, value, this._error);
    };
    LoadObject.prototype.withError = function (error) {
        return new LoadObject(this.operation, this.hasValue, this._value, error);
    };
    LoadObject.prototype.removeOperation = function () {
        if (this.operation == "None" /* None */) {
            return this;
        }
        return new LoadObject("None" /* None */, this.hasValue, this._value, this._error);
    };
    LoadObject.prototype.removeValue = function () {
        if (!this._value || !this.hasValue) {
            return this;
        }
        return new LoadObject(this.operation, false, undefined, this._error);
    };
    LoadObject.prototype.removeError = function () {
        if (!this.hasError) {
            return this;
        }
        return new LoadObject(this.operation, this.hasValue, this._value, undefined);
    };
    LoadObject.prototype.map = function (fn) {
        if (!this.hasValue) {
            return this;
        }
        return this.withValue(fn(this.value));
    };
    Object.defineProperty(LoadObject.prototype, "isCreating", {
        get: function () {
            return (this.operation == "Creating" /* Creating */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "isLoading", {
        get: function () {
            return (this.operation == "Loading" /* Loading */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "isUpdating", {
        get: function () {
            return (this.operation == "Updating" /* Updating */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "isDeleting", {
        get: function () {
            return (this.operation == "Deleting" /* Deleting */);
        },
        enumerable: true,
        configurable: true
    });
    LoadObject.prototype.done = function () {
        return this.withOperation("None" /* None */);
    };
    LoadObject.prototype.creating = function () {
        return this.withOperation("Creating" /* Creating */);
    };
    LoadObject.prototype.loading = function () {
        return this.withOperation("Loading" /* Loading */);
    };
    LoadObject.prototype.updating = function () {
        return this.withOperation("Updating" /* Updating */);
    };
    LoadObject.prototype.deleting = function () {
        return this.withOperation("Deleting" /* Deleting */);
    };
    LoadObject.empty = function () {
        return this.createFromOperation("None" /* None */);
    };
    LoadObject.creating = function () {
        return this.createFromOperation("Creating" /* Creating */);
    };
    LoadObject.loading = function () {
        return this.createFromOperation("Loading" /* Loading */);
    };
    LoadObject.updating = function () {
        return this.createFromOperation("Updating" /* Updating */);
    };
    LoadObject.deleting = function () {
        return this.createFromOperation("Deleting" /* Deleting */);
    };
    LoadObject.fromValue = function (value) {
        return new LoadObject("None" /* None */, true, value, undefined);
    };
    LoadObject.fromError = function (error) {
        return new LoadObject("None" /* None */, false, undefined, error);
    };
    LoadObject.createFromOperation = function (operation) {
        return new LoadObject(operation, false, undefined, undefined);
    };
    return LoadObject;
}());
exports.default = LoadObject;
//# sourceMappingURL=loadObject.js.map