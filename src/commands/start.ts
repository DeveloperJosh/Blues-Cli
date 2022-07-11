//// command for starting a web server
// Language: typescript
import type { Arguments, CommandBuilder } from 'yargs';
import os from 'os';
import http from 'http';

type Options = {
    port: number;
    upper: boolean | undefined;
  };
  
  export const command: string = 'start <port>';
  export const desc: string = 'Start a web server on <port>';
  
  export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs.positional('port', { type: 'number', demandOption: true });
  
  export const handler = (argv: Arguments<Options>): void => {
    const { port } = argv;
    http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Hello World!\n`);
    }).listen(port);
    console.log(`Server running at http://localhost:${port}/`);
  };