const section = document.querySelector('.section');
let visualisation = [];
let filmInfo = {
  nameAndStar: [[0, 'King Arthur', 0, 'n', 'n', 'n', 'n', 'n'],
  [0, 'Star Wars', 1, 'n', 'n', 'n', 'n', 'n'],
  [0, 'Coach Karter', 2, 'n', 'n', 'n', 'n', 'n']],
};
let localObj = JSON.parse(localStorage.getItem("myKey"));

if (localObj) {
  filmInfo = localObj;
  visualisation = [];

  for (let i = 0; i < localObj.nameAndStar.length; i += 1) {

    visualisation.push(`
        <div class="film-info">
          <div class="film-name">${localObj.nameAndStar[i][1]}</div>
          <div class="film-rating">
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][7]}" data-rate="5" data-film="${i}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][6]}" data-rate="4" data-film="${i}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][5]}" data-rate="3" data-film="${i}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][4]}" data-rate="2" data-film="${i}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][3]}" data-rate="1" data-film="${i}" aria-hidden="true"></i>
          </div>
        </div>  
      `);
  }

  document.getElementById('root').innerHTML = visualisation.join('\n');
} else {
  for (let i = 0; i < filmInfo.nameAndStar.length; i += 1) {
    visualisation.push(`
        <div class="film-info">
          <div class="film-name">${filmInfo.nameAndStar[i][1]}</div>
          <div class="film-rating">
            <i class="fa fa-star rating-item" data-rate="5" data-film="${filmInfo.nameAndStar[i][2]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item" data-rate="4" data-film="${filmInfo.nameAndStar[i][2]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item" data-rate="3" data-film="${filmInfo.nameAndStar[i][2]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item" data-rate="2" data-film="${filmInfo.nameAndStar[i][2]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item" data-rate="1" data-film="${filmInfo.nameAndStar[i][2]}" aria-hidden="true"></i>
          </div>
        </div>  
      `);
  }

  document.getElementById('root').innerHTML = visualisation.join('\n');
}

section.addEventListener('click', (e) => {
  if (!e.target.classList.contains('active')) {
    let collection = e.target.parentNode.children;

    for (let i = 0; i < collection.length; i++) {
      collection[i].classList.remove('active');
    }

    e.target.classList.add('active');

    for (let i = 3; i < 8; i += 1) {
      filmInfo.nameAndStar[+e.target.dataset.film][i] = 'n';
    }
    filmInfo.nameAndStar[+e.target.dataset.film][0] = +e.target.dataset.rate;
    filmInfo.nameAndStar[+e.target.dataset.film][+e.target.dataset.rate + 2] = 'active';

    filmInfo.nameAndStar.sort(function (a, b) { return b[0] - a[0] });
    for (j = 1; j < filmInfo.nameAndStar.length; j++) {
      if (filmInfo.nameAndStar[j][0] === filmInfo.nameAndStar[j - 1][0]) {
        if (filmInfo.nameAndStar[j][1] < filmInfo.nameAndStar[j - 1][1]) {
          let change_obj = filmInfo.nameAndStar[j];
          filmInfo.nameAndStar[j] = filmInfo.nameAndStar[j - 1];
          filmInfo.nameAndStar[j - 1] = change_obj;
        }
      }
    }

    visualisation = []
    for (let i = 0; i < filmInfo.nameAndStar.length; i += 1) {

      visualisation.push(`
          <div class="film-info">
            <div class="film-name">${filmInfo.nameAndStar[i][1]}</div>
            <div class="film-rating">
              <i class="fa fa-star rating-item ${filmInfo.nameAndStar[i][7]}" data-rate="5" data-film="${i}" aria-hidden="true"></i>
              <i class="fa fa-star rating-item ${filmInfo.nameAndStar[i][6]}" data-rate="4" data-film="${i}" aria-hidden="true"></i>
              <i class="fa fa-star rating-item ${filmInfo.nameAndStar[i][5]}" data-rate="3" data-film="${i}" aria-hidden="true"></i>
              <i class="fa fa-star rating-item ${filmInfo.nameAndStar[i][4]}" data-rate="2" data-film="${i}" aria-hidden="true"></i>
              <i class="fa fa-star rating-item ${filmInfo.nameAndStar[i][3]}" data-rate="1" data-film="${i}" aria-hidden="true"></i>
            </div>
          </div>  
        `);
    }

    document.getElementById('root').innerHTML = visualisation.join('\n');

    console.log(filmInfo.nameAndStar);

    localStorage.setItem("myKey", JSON.stringify(filmInfo));
  }
});
