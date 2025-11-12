fetch("https://restcountries.com/v3.1/name/china")
  .then(response => response.json())
  .then(data => {
    document.getElementById("country-name").innerText = data[0].name.common;
    document.getElementById("country-capital").innerText = data[0].capital[0];
    document.getElementById("country-population").innerText = data[0].population.toLocaleString();
    document.getElementById("country-flag").innerHTML = `<img src="${data[0].flags.png}" width="200">`;
  })