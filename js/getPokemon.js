export default async function getPokemon(url, main) {
  const btnReset = document.querySelector(".btn__reset");
  try {
    main.innerHTML = `<img src= "./assets/loader.svg" alt="cargando..." class="loader">`;
    let template = "";
    let res = await fetch(url);
    let pokemon = await res.json();

    let types = pokemon.types.map((el) => el.type).map((el) => el.name);
    const imgPokemon = pokemon.sprites.front_default;

    template += `
        <div class="pokemon classic ${types[0]} ">
        <div class="pokemon__body">
          <h2 class="pokemon__name">${pokemon.name.trim()}</h2>
          <div class="body__types">
            <p class="type__1">${types[0] ? types[0] : ""}</p>
            <p class="type__2">${types[1] ? types[1] : ""}</p>
          </div>
        </div>
        <img src=${imgPokemon} alt=${pokemon.name} />
        <img src="../assets/pokeball.png" alt="" class="pokeball"/>
      </div>`;
    main.innerHTML = template;
  } catch (err) {
    let message =
      "No existe ningún pokemon con ese Nombre o ID, intente nuevamente";
    main.style.display = "block";
    main.innerHTML = `<p class="noFound">${message}</p>`;
  } finally {
    document.addEventListener("click", (e) => {
      if (e.target === btnReset) {
        location.reload();
      }
    });
  }
}
