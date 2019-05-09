const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
let data;

const getData = async () => {
    const res = await fetch("../data/data.json");
    data = await res.json();
}

const searchData = async searchText => {
  let matches = data.filter(dataItem => {
    const regEx = new RegExp(`^${searchText}`, "gi");
    return dataItem.name.match(regEx) || dataItem.capital.match(regEx);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(
      match => `
            <div class="card card-body mb-1">
                <h4>
                    ${match.name}
                    <span class="text-primary">${match.capital}</span>
                </h4>
                <small>Ludność: ${match.population} / Powierzchnia: ${match.area}</small>
            </div>
        `
    ).join("");

    matchList.innerHTML = html;
  }
};

window.addEventListener("DOMContentLoaded", getData);
search.addEventListener("input", () => searchData(search.value));
