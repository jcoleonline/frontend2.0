const inputEl = document.querySelector("#autocomplete-input")

inputEl.addEventListener("input", onInputChange);

getCountryData();

let countryNames = [];

//--

async function getCountryData() {
  const countryRes = await fetch("https://restcountries.com/v3.1/all");
  const data = await countryRes.json();

  countryNames = data.map((country) => {
    return country.name.common;
  });
}

//-----

function onInputChange() {
  removeAutocompleteDropdown();

  const value = inputEl.value.toLowerCase();

  if(value.length === 0)return;

  const filteredNames = [];

  countryNames.forEach((countryName) => {
    if (countryName.substr(0, value.length).toLowerCase() === value)
      filteredNames.push(countryName);
  });
  createAutocompleteDropdown(filteredNames);
}

//-----

function createAutocompleteDropdown(List) {
  const listEl = document.createElement("ul");
  listEl.className = "autocomplete-list";
  listEl.id = "autocomplete-list";

  List.forEach((country) => {
    const listItem = document.createElement("li");

    const countryButton = document.createElement("button");
    countryButton.innerHTML = country;
    countryButton.addEventListener('click', onCountryButtonClick);
    listItem.appendChild(countryButton);

    listEl.appendChild(listItem);
  });

  document.querySelector("#autocomplete-wrapper").appendChild(listEl);
};

//----

function removeAutocompleteDropdown() {
  const listEl = document.querySelector('#autocomplete-list')
  if (listEl) listEl.remove();
};

//---

function onCountryButtonClick(e) {
e.preventDefault();

const buttonEl = e.target;
inputEl.value = buttonEl.innerHTML;

removeAutocompleteDropdown();

}

//----



//----------------

// let searchButton = document.getElementById("button-addon2");
// let searchInput = document.getElementById("search-bar");

// searchButton.addEventListener('click', () => {
    
//     let name = searchInput.value;
//     let finalUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`;

//     console.log(finalUrl);
//     fetch(finalUrl)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data[0]);
//         console.log(data[0].capital[0]);
//         console.log(data[0].flags.svg);
//         console.log(data[0].name.common);
//         console.log(data[0].continents[0]);
//         console.log(Object.keys(data[0].currencies)[0]);
//         console.log(data[0].currencies[Object.keys(data[0].currencies)]);
//         console.log();

//     });
// });
let startingCurrency = document.querySelector("#start_currency_selector")
let finalCurrency = document.querySelector("#final_currency_selector")


//     console.log(finalUrl);
// })

// Currency Convert
const currencyBaseURL = "https://api.exchangerate.host/"
const currencyList = () => {
    fetch(`${currencyBaseURL}symbols`)
        .then(response => response.json())
        .then(data => {
            let countryCode = Object.keys(data.symbols)
            for (currentCountry of countryCode) {
                startingCurrency.innerHTML += `<option value=${currentCountry}>${currentCountry}</option>`
                finalCurrency.innerHTML += `<option value=${currentCountry}>${currentCountry}</option>`
            }
        });
}
currencyList()

const currencyConvert = () => {
    let baseURL = `https://api.exchangerate.host/convert?from=${startingCurrency}&to=${finalCurrency}`
    fetch(baseURL)
        .then(response => response.json())
        .then(data => console.log(data))



    console.log("test")
}
