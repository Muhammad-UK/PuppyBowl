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

  $players.innerHTML = state.players
    .map(
      (player) => `
        <section>
            <div>
                <h2>${player.name}</h2>
                <p>${player.breed}</p>
                <img src="${player.imageUrl}">
            </div>
        </section>
    `
    )
    .join("");
};

const init = async () => {
  renderPlayers();
};

init();
