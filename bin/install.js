#!/usr/bin/env node

var Validate = require("git-validate");

Validate.installScript("lint", "eslint .");
Validate.installScript("validate", "npm ls");
Validate.configureHook("pre-commit", ["lint", "validate", "test"]);