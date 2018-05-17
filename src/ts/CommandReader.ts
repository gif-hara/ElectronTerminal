namespace ET
{
    export class CommandReader
    {
        constructor()
        {
            var inputField = <HTMLInputElement>document.getElementById("command_input_field");
            inputField.onkeydown = () =>
            {
                var e = <KeyboardEvent>window.event;
                if (e.keyCode == 13)
                {
                    var inputText = inputField.value;
                    alert(inputText);
                }
            };
        }
    }
}