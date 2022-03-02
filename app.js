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

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    for (let i = 0; i < json.results.length; i++) {
      try {
        let url = json.results[i].url;
        let res = await fetch(url);
        let pokemon = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        const gif =
          pokemon["sprites"]["versions"]["generation-v"]["black-white"][
            "animated"
          ]["front_default"];
        const imgPokemon = pokemon.sprites.front_default;

        template += `
        <div class="pokemon">
          <img src=${imgPokemon} alt =${pokemon.name}">
          <h2>${pokemon.name}</h2>
        </div>`;
      } catch (err) {
        let message = err.statusText || "Ocurrió un error, intente nuevamente";
        template = `
          <p>Error: ${err.status} ${message}</p>
        `;
      }
    }
    main.innerHTML = template;
    prevLink = json.previous ? `<a href="${json.previous}">⏪</a>` : "";
    nexLink = json.next ? `<a href="${json.next}">⏭️</a>` : "";

    links.innerHTML = prevLink + "" + nexLink;
  } catch (err) {
    let message = err.statusText || "Ocurrió un error, intente nuevamente";
    main.innerHTML = `<p> Error: ${err.status} ${message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  getPokemon(pokeApi);
});
document.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    getPokemon(e.target.href);
  }
});
