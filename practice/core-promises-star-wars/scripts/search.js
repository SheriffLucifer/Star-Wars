// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Тут ваш код.

const input = document.querySelector(".input").value.trim();
const searchButton = document.getElementById("byQueryBtn");
const result = document.getElementById("result-container");
const spinner = document.querySelector(".spinner");
const msgHeader = document.querySelector(".message-header");
const msgBody = document.querySelector(".message-body");

searchButton.addEventListener("click", searchCharacters);

function searchCharacters() {
  const input = document.querySelector(".input").value.trim();
  // Отобразить спиннер при выполнении запроса
  spinner.style.visibility = "visible";

  // Скрыть предыдущие результаты
  msgHeader.textContent = "";
  msgBody.textContent = "";

  // Вызвать метод поиска персонажей
  starWars
    .searchCharacters(input)
    .then(async (characters) => {
      // Скрыть спиннер после получения результатов
      spinner.style.visibility = "hidden";

      // Показать результаты в блоке
      result.style.visibility = "visible";
      const character = characters.results[0];
      const homeworldId = character.homeworld.split("/").slice(-2, -1)[0];
      const homeworldData = await starWars.getPlanetsById(homeworldId);
      const homeworldName = homeworldData.name;

      // Заменить ссылку на планету на её наименование в изначальных данных о персонаже
      character.homeworld = homeworldName;
      msgHeader.textContent = character.name;

      for (let key in character) {
        const value = document.createElement("p");
        value.textContent = `${key}: ${character[key]}`;
        msgBody.appendChild(value);
      }
    })
    .catch((error) => {
      // Обработать ошибку, если она возникнет
      console.error("Error searching characters:", error);
      // Скрыть спиннер в случае ошибки
      spinner.style.visibility = "hidden";
    });
}
