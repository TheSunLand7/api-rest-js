// import 'dotenv/config';
import dogs from "./modulos.js";

/**General settings | Comment if you do not need some or all of them */
const { log, error, warn, time, group, groupEnd } = console;
const API_KEY = "live_3XFoMe0gwv1yUbucvdtWDLWsn6ZItSOK8NFa1zHBdHtwH98tkx7oIwNeSyHEcYKu";
const API_SEARCH = `https://api.thedogapi.com/v1/images/search?limit=2`;
const API_FAV = `https://api.thedogapi.com/v1/favourites`;

const $btnRefresh = document.getElementById('refresh'),
    $img1 = document.getElementById('img1'),
    $img2 = document.getElementById('img2'),
    $favImgCont = document.getElementById('favorite-container'),
    $fragment = document.createDocumentFragment(),
    $error = document.getElementById('error'),
    $getAll = document.querySelectorAll('img');

//Default imgs
$img1.src = dogs[0].url;
$img2.src = dogs[1].url;
$getAll.forEach(img => {
    img.width = 200;
    img.height = 200;
});


$btnRefresh.addEventListener('click', async () => {
    try {
        const response = await fetch(API_SEARCH);
        const dogs = await response.json();
        if (!response.ok) throw { message: dogs.message }
        $img1.src = dogs[0].url;
        $img2.src = dogs[1].url;

        const btn1 = document.getElementById('btn1'),
            btn2 = document.getElementById('btn2');

        btn1.onclick = () => saveFav(dogs[0].id);
        btn2.onclick = () => saveFav(dogs[1].id);

    } catch (error) {
        $error.innerText = `Hubo un error ${error.message}.`;
    }
});

async function loadFav() {
    try {
        const response = await fetch(`${API_FAV}?api_key=${API_KEY}`);
        const json = await response.json();
        log('Load fav: ', json);
        if (!response.ok) throw { message: json.message }
        json.forEach(item => {
            const $favImg = document.createElement('img'),
                $enter = document.createElement('br'),
                $div = document.createElement('div'),
                $btnQuit = document.createElement('button');

            $btnQuit.innerText = 'QUIT FROM FAVORITES';
            $btnQuit.classList.add('quit');

            $favImg.src = item.image.url;
            $favImg.width = 200;
            $favImg.height = 200;

            $div.appendChild($favImg);
            $div.appendChild($enter);
            $div.appendChild($btnQuit);
            $fragment.appendChild($div);

            $btnQuit.onclick = () => deleteFav(item.id);
        });
        $favImgCont.appendChild($fragment);
    } catch (error) {
        $error.innerText = `Hubo un error: ${error.message}.`;
    }
}

async function saveFav(id) {
    try {
        const response = await fetch(API_FAV, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify({
                image_id: id
            }),
        });
        const json = await response.json();
        if (!response.ok) throw { message: json.message }
        log('Save fav: ', json);
    } catch (error) {
        $error.innerText = `Hubo un error: ${error.message}.`;
    }
}

async function deleteFav(id) {
    try {
        const response = await fetch(`${API_FAV}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify({
                favourite_id: id
            }),
        });
        const json = await response.json();
        if (!response.ok) throw { message: json.message }
        log('Delete fav: ', json);
    } catch (error) {
        $error.innerText = `Hubo un error: ${error.message}.`;
    }
}

loadFav();
// $btnRefresh.onclick = () => reloadDogs();