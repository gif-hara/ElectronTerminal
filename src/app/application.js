'use strict';

var application =
{
    initialize: function ()
    {
        var inputField = document.forms.command.text;
        inputField.onkeydown = () =>
        {
            if (window.event.keyCode == 13)
            {
                var inputText = document.forms.command.text.value;
                alert(inputText);
            }
        };
    }
}

module.exports = application;