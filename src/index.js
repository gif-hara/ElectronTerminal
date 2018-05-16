'use strict';

var electron = require("electron");
var app = electron.app;
var remote = electron.remote;
var application = require("./app/application");
application.initialize();
