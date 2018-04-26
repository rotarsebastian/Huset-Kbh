window.addEventListener('load',()=>{
  let menuOpen = false;
  let menuIcon = document.querySelector("svg.menuIcon")
  let menu = document.querySelector(".menu");
  let bars = menuIcon.querySelectorAll("rect");
  menuIcon.addEventListener('click', toggleMenu);

  function toggleMenu(){
    menuOpen = !menuOpen;
    bars[0].classList.toggle("rotateDown");
    bars[1].classList.toggle("fadeOut");
    bars[2].classList.toggle("rotateUp");
    menu.classList.toggle("hidden");
  }

  fetch("http://wordpress.quickcocktails.dk/wp-json/wp/v2/categories")
    .then(e=>e.json())
    .then(buildMenu)

  function buildMenu(data){
    let parentElement = document.querySelector(".menu ul");
    data.forEach(item => {
      console.log(item);
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.textContent = item.name;
      a.style.color = "white";
      a.style.textDecoration = "none";
      a.style.fontSize = "1.5em";
         a.style.lineHeight = "2em";
         a.style.fontFamily = "Work Sans";
        li.style.textAlign = "center";
      a.href="index.html?category="+item.id;

      li.appendChild(a);
      parentElement.appendChild(li);


    })
  }


});

