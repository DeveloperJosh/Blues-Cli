// Chat Bot
// Language: typescript
import type { Arguments, CommandBuilder } from 'yargs';
import ChatAI from './bot/ai';
import colors from "colors";
colors.enable()

type Options = {
  message: string;
};
  
  export const command: string = 'chat <message>';
  export const desc: string = 'Chat with <message>';
  
  export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.positional('message', { type: 'string', demandOption: true });
  
  export const handler = (argv: Arguments<Options>): void => {
    const { message } = argv;
    const chat = new ChatAI();
    chat.getResponse(message).then((response) => {
        console.log(`AI: ${response}`.green);
 }).catch((err) => {
        console.log(`Error: ${err}`.red);
     });
};