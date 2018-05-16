'use strict';

/**
 * ユーザーが入力したコマンドを処理するクラス
 */
let hoge = 0;
module.exports =
{
    /**
     * 初期化
     */
    initialize: function()
    {
        var inputField = document.forms.command.text;
        inputField.onkeydown = () =>
        {
            if (window.event.keyCode == 13)
            {
                var inputText = document.forms.command.text.value;
                hoge++;
                alert(hoge);
            }
        };
    }
};