// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

const searchButton = document.getElementById("byQueryBtn");
const searchButtonId = document.getElementById("byIdBtn");
const resultContainer = document.getElementById("result-container");
const spinner = document.querySelector(".spinner");
const msgHeader = document.querySelector(".message-header");
const msgBody = document.querySelector(".message-body");
const resourceSelect = document.getElementById("selection");
const resourceSelectId = document.getElementById("selectionId");

searchButton.addEventListener("click", searchCharacters);

async function searchCharacters() {
  const input = document.querySelector(".inputByQuery").value.trim();
  const selectedResource = resourceSelect.value;
  // Отобразить спиннер при выполнении запроса
  spinner.style.visibility = "visible";

  // Скрыть предыдущие результаты
  msgHeader.textContent = "";
  msgBody.textContent = "";
  resultContainer.style.visibility = "hidden";

  let searchMethod;
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

    // Скрыть спиннер после получения результатов
    spinner.style.visibility = "hidden";

    // Показать результаты в блоке
    resultContainer.style.visibility = "visible";
    const data = results.results[0];

    // Если выбран ресурс "people", заменить ссылку на планету на её наименование
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
    // Обработать ошибку, если она возникнет
    console.error("Error searching characters:", error);
    // Скрыть спиннер в случае ошибки
    spinner.style.visibility = "hidden";
  }
}

searchButtonId.addEventListener("click", searchById);

async function searchById() {
  const inputById = document.getElementById("input").value.trim();
  const selectedResource = resourceSelectId.value;

  // Отобразить спиннер при выполнении запроса
  spinner.style.visibility = "visible";

  // Скрыть предыдущие результаты
  msgHeader.textContent = "";
  msgBody.textContent = "";
  resultContainer.style.visibility = "hidden";

  let getByIdMethod;
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

    // Скрыть спиннер после получения результатов
    spinner.style.visibility = "hidden";

    // Показать результаты в блоке
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
    // Обработать ошибку, если она возникнет
    console.error("Error getting data by ID:", error);
    // Скрыть спиннер в случае ошибки
    spinner.style.visibility = "hidden";
  }
}
