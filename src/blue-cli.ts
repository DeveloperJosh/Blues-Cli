#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

yargs(hideBin(process.argv))
.commandDir('commands')
.strict()
.usage('$0 <cmd> [args]')
.alias({ h: 'help'})
.argv;

//// no command specified send help
if (!process.argv.slice(2).length) {
    yargs.showHelp();
}