'use strict';

module.exports = class CommandReader
{
    /**
     * ユーザーが入力したコマンドを処理するクラス
     */
    constructor()
    {
        this.hoge = 0;
        var inputField = document.forms.command.text;
        inputField.onkeydown = () =>
        {
            if (window.event.keyCode == 13)
            {
                var inputText = document.forms.command.text.value;
                this.hoge++;
                alert(inputText + " hoge = " + this.hoge);
            }
        };
    }
}