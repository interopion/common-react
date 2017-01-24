"use strict";

/**
 * Creates dynamic set of routes to provide the generic CRUD UI scaffolding
 * @param  {String} mountPoint The API base URI
 * @return {Object}            Plain route to be consumed bu react-router
 */
module.exports = function (mountPoint, schema) {
    return {
        getChildRoutes: function getChildRoutes(location, callback) {
            require.ensure([], function (require) {
                callback(null, [require("./browse")(mountPoint, schema), require("./create")(mountPoint, schema), require("./view")(mountPoint, schema), require("./edit")(mountPoint, schema), require("./delete")(mountPoint, schema)]);
            });
        },
        getIndexRoute: function getIndexRoute(location, callback) {
            require.ensure([], function (require) {
                callback(null, {
                    component: require("./browse")(mountPoint, schema)
                });
            });
        }
    };
};