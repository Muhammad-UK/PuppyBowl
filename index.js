// Defining the API and necessary information as per the API's documentation
const COHORT = "2309-AM";
const API = "https://fsa-puppy-bowl.herokuapp.com/api/" + COHORT;

// Initializing a 'state' variable to control / hold all our current data
const state = {
  players: [],
  selectedPlayer: null,
};

// Defining an async function to fetch data from the API for whatever specific data we want to use, in this case, data.players
const getPlayers = async () => {
  try {
    const response = await fetch(API + "/players");
    const json = await response.json();
    state.players = json.data.players;
  } catch (error) {
    console.log(error);
  }
};

// Defining another async function to render the data to the DOM, specifically just when there isn't any selected player
const renderPlayers = async () => {
  await getPlayers();

  const $players = document.querySelector("div.players");

  // Creating a 'section' element here so I can modify it later, probably could do this with the button as well but I used a different method there
  const $playersSection = state.players.map((player) => {
    const section = document.createElement("section");
    section.innerHTML = `
        <div>
            <h2>${player.name}</h2>
            <p>${player.breed}</p>
        </div>
    `;

    // Adding an event listener to add data to the selected player in state
    section.addEventListener("click", () => {
      state.selectedPlayer = player;
      render();
      window.location.hash = player.id;
    });
    return section;
  });
  $players.replaceChildren(...$playersSection);
};

// Creating another function to render but only just one datapoint whenever it is !null
const renderSinglePlayer = () => {
  const $players = document.querySelector("div.players");
  const $button = document.querySelector("div.button");

  $button.innerHTML = "<h2>Back to All Puppies</h2>";
  $players.innerHTML = `
        <section class="singlePuppy">
            <div>
                <h2>${state.selectedPlayer.name}</h2>
                <p>${state.selectedPlayer.breed}</p>
                <img src="${state.selectedPlayer.imageUrl}">
            </div>
        </section>
    `;

  // Checking if the 'button' (really it's just an h2) is clicked meaning the user wants to go back to the main page, then updating the state as necessary
  $button.querySelector("h2").addEventListener("click", () => {
    state.selectedPlayer = null;
    $button.replaceChildren();
    render();
    window.location.hash = "";
  });
};

// Defining a specific render function to reuse renderPlayers and renderSinglePlayer functions, checking the value of state first
const render = () => {
  if (!state.selectedPlayer) {
    renderPlayers();
  } else {
    renderSinglePlayer();
  }
};

// Defining an async function to check the hash state as well as updating the url with the appropriate playerID as needed
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

// Using the loadPlayerFromHash in the next function means that I need to also use the function whenever the hash changes for the window
window.addEventListener("hashchange", loadPlayerFromHash);

// The initializer function that calls every other function as needed as they are all nested
const init = async () => {
  loadPlayerFromHash();
};

init();
