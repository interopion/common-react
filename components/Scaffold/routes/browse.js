"use strict";

module.exports = function (mountPoint, schema) {
    return {
        path: mountPoint,
        getComponents: function getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../BrowseRecordsPage").default(mountPoint, schema));
            });
        }
    };
};