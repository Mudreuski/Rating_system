const section = document.querySelector('.section');
const addFilmName = document.getElementById('addFilmName');
const addFilmButton = document.getElementById('addFilmButton');
let visualisation = [];
let filmInfo = {
  nameAndStar: [[0, 'Coach Karter', 0, 'n', 'n', 'n', 'n', 'n'],
  [0, 'King Arthur', 1, 'n', 'n', 'n', 'n', 'n'],
  [0, 'Star Wars', 2, 'n', 'n', 'n', 'n', 'n']],
};
let localObj = JSON.parse(localStorage.getItem("storage"));

if (localObj) {
  filmInfo = localObj;
  visualisationItems(localObj.nameAndStar);
} else {
  visualisationItems(filmInfo.nameAndStar);
}

section.addEventListener('click', (e) => {
  if (!e.target.classList.contains('active')) {
    let collection = e.target.parentNode.children;

    for (let i = 0; i < collection.length; i++) {
      collection[i].classList.remove('active');
    }
    e.target.classList.add('active');

    for (let i = 3; i < filmInfo.nameAndStar[+e.target.dataset.film].length; i += 1) {
      filmInfo.nameAndStar[+e.target.dataset.film][i] = 'n';
    }
    filmInfo.nameAndStar[+e.target.dataset.film][0] = +e.target.dataset.rate;
    filmInfo.nameAndStar[+e.target.dataset.film][+e.target.dataset.rate + 2] = 'active';

    sortFilms();
    visualisationItems(filmInfo.nameAndStar);

    localStorage.setItem("storage", JSON.stringify(filmInfo));
  }
});

addFilmButton.addEventListener('click', () => {
  if (addFilmName.value === "" || addFilmName.value === " ") {return false;};

  filmInfo.nameAndStar.push([0, addFilmName.value, filmInfo.nameAndStar.length, 'n', 'n', 'n', 'n', 'n']);
  sortFilms();
  visualisationItems(filmInfo.nameAndStar);

  addFilmName.value = "";

  localStorage.setItem("storage", JSON.stringify(filmInfo));
});

function sortFilms() {
  filmInfo.nameAndStar.sort(function (a, b) { return b[0] - a[0] });
  for (i = 1; i < filmInfo.nameAndStar.length; i++) {
    for (j = 1; j < filmInfo.nameAndStar.length; j++) {
      if (filmInfo.nameAndStar[j][0] === filmInfo.nameAndStar[j - 1][0]) {
        if (filmInfo.nameAndStar[j][1].toLocaleLowerCase() < filmInfo.nameAndStar[j - 1][1].toLocaleLowerCase()) {
          let change_obj = filmInfo.nameAndStar[j];
          filmInfo.nameAndStar[j] = filmInfo.nameAndStar[j - 1];
          filmInfo.nameAndStar[j - 1] = change_obj;
        }
      }
    }
  }
}

function visualisationItems(arrayItems) {
  visualisation = [];

  for (let i = 0; i < arrayItems.length; i += 1) {
    visualisation.push(`
      <div class="film-info">
        <div class="film-name">${arrayItems[i][1]}</div>
        <div class="film-rating">
          <i class="fa fa-star rating-item ${arrayItems[i][7]}" data-rate="5" data-film="${i}" aria-hidden="true"></i>
          <i class="fa fa-star rating-item ${arrayItems[i][6]}" data-rate="4" data-film="${i}" aria-hidden="true"></i>
          <i class="fa fa-star rating-item ${arrayItems[i][5]}" data-rate="3" data-film="${i}" aria-hidden="true"></i>
          <i class="fa fa-star rating-item ${arrayItems[i][4]}" data-rate="2" data-film="${i}" aria-hidden="true"></i>
          <i class="fa fa-star rating-item ${arrayItems[i][3]}" data-rate="1" data-film="${i}" aria-hidden="true"></i>
        </div>
      </div>  
    `);
  }

  document.getElementById('root').innerHTML = visualisation.join('\n');
}