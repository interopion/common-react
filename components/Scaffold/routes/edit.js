module.exports = function(mountPoint, schema) {
    return {
        path: mountPoint + "/:id/edit",
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../EditRecordPage").wrap(mountPoint, schema))
            })
        }
    }
};
