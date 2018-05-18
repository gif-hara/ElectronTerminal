/// <reference path="./CommandReader.ts"/>

namespace ET
{
    export class Application
    {
        constructor()
        {
        }

        public run(): void
        {
            var commandReader = new ET.CommandReader();
        }
    }
}