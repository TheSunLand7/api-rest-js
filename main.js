import dogs from "./modulos.js";
/**General settings | Comment if you do not need some or all of them */
const { log, error, warn, time, group, groupEnd } = console;

const API = 'https://api.thedogapi.com/v1/images/search';

const btn = document.querySelector('button');
const img = document.querySelector('img');

img.src = dogs[0].url;

btn.addEventListener('click', async () => {
    const response = await fetch(API);
    const dogs = await response.json();
    img.src = dogs[0].url;

});
