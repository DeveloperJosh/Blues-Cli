#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
.commandDir('commands')
.strict()
.usage('$0 <cmd> [args]')
.alias({ h: 'help'})
.argv;