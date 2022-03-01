const main = document.querySelector("main");
const links = document.querySelector(".links");
const pokeApi = "https://pokeapi.co/api/v2/pokemon";

async function getPokemon(url) {
  try {
    main.innerHTML = `<img src="assets/loader.svg" alt="cargando..." class="loader">`;
    let res = await fetch(url);
    let json = await res.json();
    let prevLink;
    let nexLink;
    let template = "";

    console.log(json);
  } catch (err) {
    let message = err.statusText || "Ocurrió un error, intente nuevamente";
    main.innerHTML = `<p> Error: ${message}</p>`;
  }
}

getPokemon(pokeApi);
