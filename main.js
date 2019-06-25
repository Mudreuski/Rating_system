(function(){
  const section = document.querySelector('.section');

  section.addEventListener('click', (e) => {
    if (!e.target.classList.contains('active')) {
      let collection = e.target.parentNode.children;
      for (let i = 0; i < collection.length; i++) {
        collection[i].classList.remove('active');
      }
    
      e.target.classList.add('active');

      filmInfo.localCheck = true;
      filmInfo.check = "lol";
      localStorage.setItem("myKey", JSON.stringify(filmInfo)); 
    }
  });
})();

let filmInfo = {
  nameAndStar:[['King Arthur', 1, 0], ['Star Wars', 2, 0], ['Coach Karter', 3, 0]],
  localCheck: false,
};

  let returnObj = JSON.parse(localStorage.getItem("myKey"));
  console.log(returnObj);
  if (returnObj.localCheck) {
    console.log("eeeeeeeee");
  }