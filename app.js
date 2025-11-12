const input = document.getElementById("country-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const info = document.getElementById("country-info");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchCountry();
  }
});

function searchCountry() {
  const countryName = input.value.trim();

  if (!countryName) {
    showError("Please enter a country name");
    return;
  }

  hideAll();
  loading.classList.add("show");

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response =>  response.json())
    .then(data => {
      const country = data[0];

      document.getElementById("country-name").innerText = country.name.common;
      document.getElementById("country-capital").innerText = country.capital ? country.capital[0] : "N/A";
      document.getElementById("country-population").innerText = country.population.toLocaleString();
      document.getElementById("country-region").innerText = country.region || "N/A";
      document.getElementById("country-subregion").innerText = country.subregion || "N/A";
      document.getElementById("country-languages").innerText = country.languages ? Object.values(country.languages).join(", ") : "N/A";
      document.getElementById("country-currencies").innerText = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(", ") : "N/A";
      document.getElementById("country-timezones").innerText = country.timezones ? country.timezones.join(", ") : "N/A";
      document.getElementById("country-borders").innerText = country.borders ? country.borders.join(", ") : "None";
      document.getElementById("country-area").innerText = country.area ? country.area.toLocaleString() + " km²" : "N/A";
      document.getElementById("country-demonyms").innerText = country.demonyms && country.demonyms.eng ? `${country.demonyms.eng.m} / ${country.demonyms.eng.f}` : "N/A";
      document.getElementById("country-gini").innerText = country.gini ? Object.entries(country.gini).map(([year, val]) => `${val} (${year})`).join(", ") : "N/A";
      document.getElementById("country-callingcodes").innerText = country.idd && country.idd.root ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : "") : "N/A";

      document.getElementById("country-flag").innerHTML = `<img src="${country.flags.png}" alt="${country.name.common} flag">`;

      if (country.latlng && country.latlng.length === 2) {
        document.getElementById("country-map").innerHTML = `
              <iframe 
                loading="lazy" 
                allowfullscreen 
                src="https://www.openstreetmap.org/export/embed.html?bbox=${country.latlng[1] - 5},${country.latlng[0] - 5},${country.latlng[1] + 5},${country.latlng[0] + 5}&layer=mapnik&marker=${country.latlng[0]},${country.latlng[1]}">
              </iframe>
            `;
      }

      loading.classList.remove("show");
      info.classList.add("show");
    })

}

function showError(message) {
  error.textContent = message;
  error.classList.add("show");
  setTimeout(() => {
    error.classList.remove("show");
  }, 3000);
}

function hideAll() {
  loading.classList.remove("show");
  error.classList.remove("show");
  info.classList.remove("show");
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const btn = document.querySelector('.theme-toggle');
  if (document.body.classList.contains('dark-mode')) {
    btn.textContent = '☀️ Light Mode';
  } else {
    btn.textContent = '🌙 Dark Mode';
  }
}

