var ET;
(function (ET) {
    var CommandReader = /** @class */ (function () {
        function CommandReader() {
            var inputField = document.getElementById("command_input_field");
            inputField.onkeydown = function () {
                var e = window.event;
                if (e.keyCode == 13) {
                    var inputText = inputField.value;
                    alert(inputText);
                }
            };
        }
        return CommandReader;
    }());
    ET.CommandReader = CommandReader;
})(ET || (ET = {}));
/// <reference path="./CommandReader.ts"/>
var ET;
(function (ET) {
    var Application = /** @class */ (function () {
        function Application() {
        }
        Application.prototype.run = function () {
            var commandReader = new ET.CommandReader();
        };
        return Application;
    }());
    ET.Application = Application;
})(ET || (ET = {}));
/// <reference path="./Application.ts"/>
var ET;
(function (ET) {
    var main = /** @class */ (function () {
        function main() {
            var app = new ET.Application();
            app.run();
        }
        return main;
    }());
    ET.main = main;
})(ET || (ET = {}));
new ET.main();
