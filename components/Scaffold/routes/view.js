"use strict";

module.exports = function (mountPoint, schema) {
    return {
        path: mountPoint + "/:id",
        getComponents: function getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../ViewRecordPage").wrap(mountPoint, schema));
            });
        }
    };
};