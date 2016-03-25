module.exports = function(mountPoint, schema) {
    return {
        path: mountPoint + "/:id",
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../ViewRecordPage").wrap(mountPoint, schema))
            })
        }
    }
};
