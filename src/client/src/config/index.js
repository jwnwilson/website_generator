import dev_settings from './settings.json';
import prod_settings from './prod.json';

let settings;
let host = null;

// Only used in dev mode
if (typeof window !== `undefined`) {
    host = window.location.hostname;
}

console.log('host', host);

if (host == "localhost") {
    settings = dev_settings;
}
else {
    settings = prod_settings;
}

export default settings;