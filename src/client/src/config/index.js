import dev_settings from './settings.json';
import prod_settings from './prod.json';

let settings;
const host = window.location.hostname;

console.log('host', host);

if (host == "localhost") {
    settings = dev_settings;
}
else {
    settings = prod_settings;
}

export default settings;