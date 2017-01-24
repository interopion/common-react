"use strict";

module.exports = function (mountPoint, schema) {
    return {
        path: mountPoint + "/:id/delete",
        getComponents: function getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../DeleteRecordPage").wrap(mountPoint, schema));
            });
        }
    };
};