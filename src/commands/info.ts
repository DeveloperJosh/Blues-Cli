import type { Arguments, CommandBuilder } from 'yargs';
import os from 'os';

export const command: string = 'info';
export const desc: string = 'Info about the pc';
export const builder: CommandBuilder<{}, {}> = (yargs) => yargs;
export const handler = async (argv: Arguments<{}>): Promise<void> => {
    //// lets make cpu usage more readable

    console.log(`
    OS: ${os.platform()} ${os.arch()}
    CPU: ${os.cpus()[0].model}
    CPU Cores: ${os.cpus().length}
    RAM: ${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB
    MEMORY: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
    GPU: ${os.type()}
    GPU USAGE: ${os.loadavg()[0]}
    `);

    process.exit(0);
}