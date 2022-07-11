//// command for starting a web server
// Language: typescript
// Path: src\commands\start.ts
// Compare this snippet from src\commands\weather.ts:

import type { Arguments, CommandBuilder } from 'yargs';
import express from "express";
const app = express();

type Options = {
    port: number;
    upper: boolean | undefined;
  };
  
  export const command: string = 'start <port>';
  export const desc: string = 'Start a web server on <port>';
  
  export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
      .positional('port', { type: 'number', demandOption: true });
  
  export const handler = (argv: Arguments<Options>): void => {
    const { port } = argv;

    app.get( "/", ( req, res ) => {
        res.send( "Hello World!" );
    } );
    app.listen(port, () => {
        console.log( `server started at http://localhost:${ port }, To close the server hit Ctrl + C` );
    } )
  };