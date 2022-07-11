#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
.commandDir('commands')
.strict()
.usage('$0 <cmd> [args]')
.alias({ h: 'help'})
.argv;

/// send help to user if no command is provided
if (!process.argv.slice(2).length) {
    yargs.showHelp();
}