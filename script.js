let searchButton = document.getElementById("button-addon2");
let searchInput = document.getElementById("search-bar");

searchButton.addEventListener('click', () => {
    let name = searchInput.value;
    let finalUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`;

    console.log(finalUrl);
});