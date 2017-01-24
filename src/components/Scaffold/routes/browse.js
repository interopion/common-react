module.exports = function(mountPoint, schema) {
    return {
        path: mountPoint,
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../BrowseRecordsPage").default(mountPoint, schema))
            })
        }
    }
};
