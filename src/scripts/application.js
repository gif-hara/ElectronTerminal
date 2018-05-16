'use strict';

module.exports =
{
    run: function ()
    {
        var commandReader = require("./commandReader");
        commandReader.initialize();
    }
};