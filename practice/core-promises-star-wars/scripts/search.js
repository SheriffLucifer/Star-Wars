// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Тут ваш код.

const searchButton = document.getElementById("byQueryBtn");
const resultContainer = document.getElementById("result-container");
const spinner = document.querySelector(".spinner");
const msgHeader = document.querySelector(".message-header");
const msgBody = document.querySelector(".message-body");
const resourceSelect = document.getElementById("selection");

searchButton.addEventListener("click", searchCharacters);

async function searchCharacters() {
  const input = document.querySelector(".input").value.trim();
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
    if (selectedResource === "people" && data && data.homeworld) {
      const homeworldId = data.homeworld.split("/").slice(-2, -1)[0];
      const homeworldData = await starWars.getPlanetsById(homeworldId);
      const homeworldName = homeworldData.name;

      // Заменить ссылку на планету на её наименование в изначальных данных о персонаже
      data.homeworld = homeworldName;
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
