let localObj;
let visualisation = [];
let filmInfo = {
  nameAndStar:[['King Arthur', 0, 'n', 'n', 'n', 'n', 'n'],
               ['Star Wars', 1, 'n', 'n', 'n', 'n', 'n'],
               ['Coach Karter', 2, 'n', 'n', 'n', 'n', 'n']],
};

(function(){
  const section = document.querySelector('.section');

  section.addEventListener('click', (e) => {
    if (!e.target.classList.contains('active')) {
      let collection = e.target.parentNode.children;

      for (let i = 0; i < collection.length; i++) {
        collection[i].classList.remove('active');
      }
      console.log(filmInfo.nameAndStar[+e.target.dataset.film]);

      e.target.classList.add('active');
      console.log(filmInfo.nameAndStar[+e.target.dataset.film]);
      for (let i = 2; i < filmInfo.nameAndStar[+e.target.dataset.film].length; i += 1) {
        filmInfo.nameAndStar[+e.target.dataset.film][i] = 'n';
      }
      filmInfo.nameAndStar[+e.target.dataset.film][+e.target.dataset.rate + 1] = 'active';
      
      filmInfo.check = "lol";
      localStorage.setItem("myKey", JSON.stringify(filmInfo)); 
    }
  });
})();
  
  localObj = JSON.parse(localStorage.getItem("myKey"));
  
  if (localObj) {
    filmInfo = localObj;
    visualisation = [];
    
    for (let i = 0; i < localObj.nameAndStar.length; i += 1) {
      visualisation.push(`
        <div class="film-info">
          <div class="film-name">${localObj.nameAndStar[i][0]}</div>
          <div class="film-rating">
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][6]}" data-rate="5" data-film="${localObj.nameAndStar[i][1]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][5]}" data-rate="4" data-film="${localObj.nameAndStar[i][1]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][4]}" data-rate="3" data-film="${localObj.nameAndStar[i][1]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][3]}" data-rate="2" data-film="${localObj.nameAndStar[i][1]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item ${localObj.nameAndStar[i][2]}" data-rate="1" data-film="${localObj.nameAndStar[i][1]}" aria-hidden="true"></i>
          </div>
        </div>  
      `);
    }
    document.getElementById('root').innerHTML = visualisation.join('\n');
  } else {
    for (let i = 0; i < filmInfo.nameAndStar.length; i += 1) {
      visualisation.push(`
        <div class="film-info">
          <div class="film-name">${filmInfo.nameAndStar[i][0]}</div>
          <div class="film-rating">
            <i class="fa fa-star rating-item" data-rate="5" data-film="${filmInfo.nameAndStar[i][1]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item" data-rate="4" data-film="${filmInfo.nameAndStar[i][1]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item" data-rate="3" data-film="${filmInfo.nameAndStar[i][1]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item" data-rate="2" data-film="${filmInfo.nameAndStar[i][1]}" aria-hidden="true"></i>
            <i class="fa fa-star rating-item" data-rate="1" data-film="${filmInfo.nameAndStar[i][1]}" aria-hidden="true"></i>
          </div>
        </div>  
      `);
    }
    document.getElementById('root').innerHTML = visualisation.join('\n');
  }

