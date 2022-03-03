import getPokemon from "./js/getPokemon.js";
const main = document.querySelector(".grid-fluida");
const links = document.querySelector(".links");
const pokeApi = "https://pokeapi.co/api/v2/pokemon";
const btnReset = document.querySelector(".btn__reset");

async function getPokemons(url) {
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
        let types = pokemon.types.map((el) => el.type).map((el) => el.name);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        const imgPokemon = pokemon.sprites.front_default;

        template += `
        <div class="pokemon classic ${types[0]} ">
        <div class="pokemon__body">
          <h2 class="pokemon__name">${pokemon.name}</h2>
          <div class="body__types">
            <p class="type__1">${types[0] ? types[0] : ""}</p>
            <p class="type__2">${types[1] ? types[1] : ""}</p>
          </div>
        </div>
        <img src=${imgPokemon} alt=${pokemon.name} />
        <img src="assets/pokeball.png" alt="" class="pokeball"/>
      </div>`;
      } catch (err) {
        let message = err.statusText || "Ocurrió un error, intente nuevamente";
        template = `
          <p>Error: ${err.status} ${message}</p>
        `;
      }
    }
    main.innerHTML = template;
    prevLink = json.previous
      ? `<a href="${json.previous}"<i class='bx bx-left-arrow-alt'></i></a>`
      : "";
    nexLink = json.next
      ? `<a href="${json.next}"<i class='bx bx-right-arrow-alt'></i></a>`
      : "";

    links.innerHTML = prevLink + "" + nexLink;
  } catch (err) {
    let message = err.statusText || "Ocurrió un error, intente nuevamente";
    main.innerHTML = `<p> Error: ${err.status} ${message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  getPokemons(pokeApi);
});
document.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    getPokemons(e.target.href);
  }
});

// BUTTON SCROLL
const btnSroll = document.querySelector(".buttonUP");

window.addEventListener("scroll", (e) => {
  if (scrollY > 400) {
    btnSroll.classList.add("hidden");
  } else {
    btnSroll.classList.remove("hidden");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".buttonUP *")) {
    scrollTo(0, 0);
  }
});
// FORM
document.addEventListener("submit", (e) => {
  if (e.target.matches(".form")) {
    e.preventDefault();
    let value = e.target.searchPokemon.value.toLowerCase();
    let search = `https://pokeapi.co/api/v2/pokemon/${value}`;
    getPokemon(search, main);
    e.target.reset();
    btnReset.classList.add("active");
  }
});
