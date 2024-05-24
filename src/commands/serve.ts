import type { Arguments, CommandBuilder } from 'yargs';
import http from 'http';
import startServer from './server';

// web server 

type Options = {
    port: number;
};

export const command: string = 'serve';
export const desc: string = 'Start a web server';
export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs.options({
        port: { type: 'number', default: 3000 }
    });

export const handler = (argv: Arguments<Options>): void => {
    const port = argv.port;
    startServer(port);
}