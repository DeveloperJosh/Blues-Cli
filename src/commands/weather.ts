//// https://blue-api-v3.herokuapp.com/weather/port
import type { Arguments, CommandBuilder } from 'yargs';
import axios from 'axios';

type Options = {
  city: string;
  upper: boolean | undefined;
};

export const command: string = 'weather <city>';
export const desc: string = 'Weather <city> with Weather';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      upper: { type: 'boolean' },
    })
    .positional('city', { type: 'string', demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
    const { city, upper } = argv;
    axios
        .get(`https://blue-api-v3.herokuapp.com/weather/${city}`)
        .then((res) => {
        const { data } = res;
        const weather = `It is ${data.current.condition.text} and ${data.current.temp_c}°C in ${city}`;
        process.stdout.write(upper ? weather.toUpperCase() : weather);
        process.exit(0);
        })
        .catch((err) => {
         console.log("Something went wrong with the weather API");
        process.exit(1);
    });
};