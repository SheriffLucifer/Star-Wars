// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

interface StarWars {
  searchCharacters(input: string): Promise<any>;
  searchPlanets(input: string): Promise<any>;
  searchSpecies(input: string): Promise<any>;
  getCharactersById(id: string): Promise<any>;
  getPlanetsById(id: string): Promise<any>;
  getSpeciesById(id: string): Promise<any>;
}

const searchButton = document.getElementById("byQueryBtn") as HTMLButtonElement;
const searchButtonId = document.getElementById("byIdBtn") as HTMLButtonElement;
const resultContainer = document.getElementById(
  "result-container"
) as HTMLElement;
const spinner = document.querySelector(".spinner") as HTMLElement;
const msgHeader = document.querySelector(".message-header") as HTMLElement;
const msgBody = document.querySelector(".message-body") as HTMLElement;
const resourceSelect = document.getElementById(
  "selection"
) as HTMLSelectElement;
const resourceSelectId = document.getElementById(
  "selectionId"
) as HTMLSelectElement;

searchButton.addEventListener("click", searchCharacters);

async function searchCharacters() {
  const input = (
    document.querySelector(".inputByQuery") as HTMLInputElement
  ).value.trim();
  const selectedResource = resourceSelect.value;

  spinner.style.visibility = "visible";

  msgHeader.textContent = "";
  msgBody.textContent = "";
  resultContainer.style.visibility = "hidden";

  let searchMethod: (input: string) => Promise<any>;
  switch (selectedResource) {
    case "people":
      searchMethod = starWars.searchCharacters;
      break;
    case "planets":
      searchMethod = starWars.searchPlanets;
      break;
    case "species":
      searchMethod = starWars.searchSpecies;
      break;
    default:
      console.error("Invalid resource selected");
      return;
  }

  try {
    const results = await searchMethod(input);

    spinner.style.visibility = "hidden";

    resultContainer.style.visibility = "visible";
    const data = results.results[0];

    if (data && data.homeworld) {
      const homeworldId = data.homeworld.split("/").slice(-2, -1)[0];
      let homeworldData, homeworldName;

      if (selectedResource === "people") {
        homeworldData = await starWars.getPlanetsById(homeworldId);
      } else if (selectedResource === "species") {
        homeworldData = await starWars.getSpeciesById(homeworldId);
      }

      if (homeworldData) {
        homeworldName = homeworldData.name;
        data.homeworld = homeworldName;
      }
    }

    if (data && data.name) {
      msgHeader.textContent = data.name;
    }

    for (let key in data) {
      const value = document.createElement("p");
      if (key === "homeworld" && selectedResource === "species") {
        value.textContent = `${key}: ${data.homeworld}`;
      } else {
        value.textContent = `${key}: ${data[key]}`;
      }
      msgBody.appendChild(value);
    }
  } catch (error) {
    console.error("Error searching characters:", error);
    spinner.style.visibility = "hidden";
  }
}

searchButtonId.addEventListener("click", searchById);

async function searchById() {
  const inputById = (
    document.getElementById("input") as HTMLInputElement
  ).value.trim();
  const selectedResource = resourceSelectId.value;

  spinner.style.visibility = "visible";

  msgHeader.textContent = "";
  msgBody.textContent = "";
  resultContainer.style.visibility = "hidden";

  let getByIdMethod: (id: string) => Promise<any>;
  switch (selectedResource) {
    case "people":
      getByIdMethod = starWars.getCharactersById;
      break;
    case "planets":
      getByIdMethod = starWars.getPlanetsById;
      break;
    case "species":
      getByIdMethod = starWars.getSpeciesById;
      break;
    default:
      console.error("Invalid resource selected");
      return;
  }

  try {
    const result = await getByIdMethod(inputById);

    spinner.style.visibility = "hidden";

    resultContainer.style.visibility = "visible";

    if (result && result.name) {
      msgHeader.textContent = result.name;
    }

    for (let key in result) {
      const value = document.createElement("p");
      if (key === "homeworld" && selectedResource === "species") {
        const homeworldId = result.homeworld.split("/").slice(-2, -1)[0];
        const homeworldData = await starWars.getPlanetsById(homeworldId);
        const homeworldName = homeworldData.name;
        value.textContent = `${key}: ${homeworldName}`;
      } else {
        value.textContent = `${key}: ${result[key]}`;
      }
      msgBody.appendChild(value);
    }
  } catch (error) {
    console.error("Error getting data by ID:", error);
    spinner.style.visibility = "hidden";
  }
}
