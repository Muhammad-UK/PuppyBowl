const COHORT = "2309-AM";
const API = "https://fsa-puppy-bowl.herokuapp.com/api/" + COHORT;

const state = {
  players: [],
  selectedPlayer: null,
};

const getPlayers = async () => {
  try {
    const response = await fetch(API + "/players");
    const json = await response.json();
    state.players = json.data.players;
  } catch (error) {
    console.log(error);
  }
};

const renderPlayers = async () => {
  await getPlayers();

  const $players = document.querySelector("div.players");

  const $playersSection = state.players.map((player) => {
    const section = document.createElement("section");
    section.innerHTML = `
        <div>
            <h2>${player.name}</h2>
            <p>${player.breed}</p>
        </div>
    `;

    section.addEventListener("click", () => {
      state.selectedPlayer = player;
      render();
      window.location.hash = player.id;
    });
    return section;
  });
  $players.replaceChildren(...$playersSection);
};

const renderSinglePlayer = () => {
  const $players = document.querySelector("div.players");
  const $button = document.querySelector("div.button");

  $button.innerHTML = "<h2>Back to All Puppies</h2>";

  $players.innerHTML = `
        <section>
            <div>
                <h2>${state.selectedPlayer.name}</h2>
                <p>${state.selectedPlayer.breed}</p>
                <img src="${state.selectedPlayer.imageUrl}">
            </div>
        </section>
    `;

  $button.querySelector("h2").addEventListener("click", () => {
    state.selectedPlayer = null;
    $button.replaceChildren();
    render();
    window.location.hash = "";
  });
};

const render = () => {
  if (!state.selectedPlayer) {
    renderPlayers();
  } else {
    renderSinglePlayer();
  }
};

const loadPlayerFromHash = async () => {
  if (state.players.length === 0) {
    await getPlayers();
  }
  const idFromHash = +window.location.hash.slice(1);
  state.selectedPlayer = state.players.find(
    (player) => player.id === idFromHash
  );
  render();
};

window.addEventListener("hashchange", loadPlayerFromHash);

const init = async () => {
  loadPlayerFromHash();
};

init();
