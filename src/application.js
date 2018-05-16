function onKeyDownTextContent()
{
    if(window.event.keyCode == 13)
    {
        var inputText = document.forms.command.text.value;
        alert(inputText);
    }
}