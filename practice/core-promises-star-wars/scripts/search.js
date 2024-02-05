// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var searchButton = document.getElementById("byQueryBtn");
var searchButtonId = document.getElementById("byIdBtn");
var resultContainer = document.getElementById("result-container");
var spinner = document.querySelector(".spinner");
var msgHeader = document.querySelector(".message-header");
var msgBody = document.querySelector(".message-body");
var resourceSelect = document.getElementById("selection");
var resourceSelectId = document.getElementById("selectionId");
searchButton.addEventListener("click", searchCharacters);
function searchCharacters() {
    return __awaiter(this, void 0, void 0, function () {
        var input, selectedResource, searchMethod, results, data, homeworldId, homeworldData, homeworldName, key, value, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = document.querySelector(".inputByQuery").value.trim();
                    selectedResource = resourceSelect.value;
                    spinner.style.visibility = "visible";
                    msgHeader.textContent = "";
                    msgBody.textContent = "";
                    resultContainer.style.visibility = "hidden";
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
                            return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, searchMethod(input)];
                case 2:
                    results = _a.sent();
                    spinner.style.visibility = "hidden";
                    resultContainer.style.visibility = "visible";
                    data = results.results[0];
                    if (!(data && data.homeworld)) return [3 /*break*/, 7];
                    homeworldId = data.homeworld.split("/").slice(-2, -1)[0];
                    homeworldData = void 0, homeworldName = void 0;
                    if (!(selectedResource === "people")) return [3 /*break*/, 4];
                    return [4 /*yield*/, starWars.getPlanetsById(homeworldId)];
                case 3:
                    homeworldData = _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    if (!(selectedResource === "species")) return [3 /*break*/, 6];
                    return [4 /*yield*/, starWars.getSpeciesById(homeworldId)];
                case 5:
                    homeworldData = _a.sent();
                    _a.label = 6;
                case 6:
                    if (homeworldData) {
                        homeworldName = homeworldData.name;
                        data.homeworld = homeworldName;
                    }
                    _a.label = 7;
                case 7:
                    if (data && data.name) {
                        msgHeader.textContent = data.name;
                    }
                    for (key in data) {
                        value = document.createElement("p");
                        if (key === "homeworld" && selectedResource === "species") {
                            value.textContent = "".concat(key, ": ").concat(data.homeworld);
                        }
                        else {
                            value.textContent = "".concat(key, ": ").concat(data[key]);
                        }
                        msgBody.appendChild(value);
                    }
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error("Error searching characters:", error_1);
                    spinner.style.visibility = "hidden";
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
searchButtonId.addEventListener("click", searchById);
function searchById() {
    return __awaiter(this, void 0, void 0, function () {
        var inputById, selectedResource, getByIdMethod, result, _a, _b, _c, _i, key, value, homeworldId, homeworldData, homeworldName, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputById = document.getElementById("input").value.trim();
                    selectedResource = resourceSelectId.value;
                    spinner.style.visibility = "visible";
                    msgHeader.textContent = "";
                    msgBody.textContent = "";
                    resultContainer.style.visibility = "hidden";
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
                            return [2 /*return*/];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, getByIdMethod(inputById)];
                case 2:
                    result = _d.sent();
                    spinner.style.visibility = "hidden";
                    resultContainer.style.visibility = "visible";
                    if (result && result.name) {
                        msgHeader.textContent = result.name;
                    }
                    _a = result;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 3;
                case 3:
                    if (!(_i < _b.length)) return [3 /*break*/, 8];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 7];
                    key = _c;
                    value = document.createElement("p");
                    if (!(key === "homeworld" && selectedResource === "species")) return [3 /*break*/, 5];
                    homeworldId = result.homeworld.split("/").slice(-2, -1)[0];
                    return [4 /*yield*/, starWars.getPlanetsById(homeworldId)];
                case 4:
                    homeworldData = _d.sent();
                    homeworldName = homeworldData.name;
                    value.textContent = "".concat(key, ": ").concat(homeworldName);
                    return [3 /*break*/, 6];
                case 5:
                    value.textContent = "".concat(key, ": ").concat(result[key]);
                    _d.label = 6;
                case 6:
                    msgBody.appendChild(value);
                    _d.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_2 = _d.sent();
                    console.error("Error getting data by ID:", error_2);
                    spinner.style.visibility = "hidden";
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
