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
    });
    return section;
  });
  $players.replaceChildren(...$playersSection);
};

const renderSinglePlayer = () => {
  const $players = document.querySelector("div.players");
  $players.innerHTML = `
        <section>
            <div>
                <h2>${state.selectedPlayer.name}</h2>
                <p>${state.selectedPlayer.breed}</p>
                <img src="${state.selectedPlayer.imageUrl}">
            </div>
        </section>
    `;

  $players.querySelector("section").addEventListener("click", () => {
    state.selectedPlayer = null;
    render();
  });
};

const render = () => {
  if (!state.selectedPlayer) {
    renderPlayers();
  }
  renderSinglePlayer();
};

const init = async () => {
  renderPlayers();
};

init();
