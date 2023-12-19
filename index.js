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
    state.players = json.data;
  } catch (error) {
    console.log(error);
  }
};
