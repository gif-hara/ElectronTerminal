'use strict';

module.exports = class Application
{
    constructor()
    {

    }

    /**
     * アプリケーションを開始する
     */
    run()
    {
        var CommandReader = require("./CommandReader");
        var commandReader = new CommandReader();
    }
}