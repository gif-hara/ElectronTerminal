'use strict';

var electron = require("electron");
var app = electron.app;
var remote = electron.remote;
var application = require("./scripts/application");
application.initialize();
