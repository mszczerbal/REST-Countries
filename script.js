let countries;
const countriesList = document.querySelector('.countries');

fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => showCountry(data))
    .catch(err => console.log('Błąd: ', err));

function showCountry(countriesInfo) {
    countries = countriesInfo;
    let options = "";
    countries.forEach(country => {
        options += `<option value='${country.alpha3Code}'>${country.name}</option>`;
    });
    countriesList.innerHTML = options;
    countriesList.selectedIndex = Math.floor(Math.random() * countriesList.length);
    showInfo(countriesList[countriesList.selectedIndex].value);
}

function showInfo(countryByID) {
    const countryInfo = countries.find(country => country.alpha3Code === countryByID);
    console.log(countryInfo);
    document.querySelector('.country-flag img').src = countryInfo.flag;
    document.querySelector('.country-flag img').alt = `Flaga ${countryInfo.name}`;
    document.querySelector('.capital').innerHTML = countryInfo.capital;
    document.querySelector('.population').innerHTML = countryInfo.population.toLocaleString('pl-PL') + ' obywateli';
    document.querySelector('.currency').innerHTML = countryInfo.currencies.map(currency => `${currency.name}`);
    document.querySelector('.language').innerHTML = countryInfo.languages.map(language => `${language.name}`);
    document.querySelector('.region').innerHTML = countryInfo.region;
    document.querySelector('.domain').innerHTML = countryInfo.topLevelDomain;
};

countriesList.addEventListener('change', event => {
    showInfo(event.target.value);
});

