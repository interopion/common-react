module.exports = function(mountPoint, schema) {
    return {
        path: mountPoint + "/:id/delete",
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../DeleteRecordPage").wrap(mountPoint, schema))
            })
        }
    }
};
