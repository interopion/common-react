module.exports = function(mountPoint, schema) {
    return {
        path: mountPoint + "/create",
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../CreateRecordPage").wrap(mountPoint, schema))
            })
        }
    }
};
