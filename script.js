      let back = document.querySelector("body");
      let main = document.querySelector("main");
      let appBar = document.querySelector(".appbar");
      (function () {
          var loader = document.querySelector(".cs-loader"),

              show = function () {
                  loader.style.display = "block";
                  setTimeout(hide, 3000);
              },

              hide = function () {
                  loader.style.display = "none";
                  main.style.display = "block";
                  appBar.style.display = "block";
               
              };

          show();
      })();







      let template = document.querySelector("#evTemp").content;
      let eventList = document.querySelector("#eventList");
      let page = 1;
      let lookingForData = false;

      function fetchEvents() {
          lookingForData = true;

          let urlParams = new URLSearchParams(window.location.search);

          let catid = urlParams.get("category");
          let endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/events?_embed&per_page=2&page=" + page
          if (catid) { // DRY
              endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/events?_embed&per_page=2&page=" + page + "&categories=" + catid
          }
          fetch(endpoint)
              .then(e => e.json())
              .then(showEvents);


      }

      function showEvents(data) {
          console.log(data)
          lookingForData = false;
          data.forEach(showSingleEvent);
      }

      function showSingleEvent(anEvent) {
          let clone = template.cloneNode(true);
          
          
          clone.querySelector("#title").textContent = anEvent.title.rendered;

          clone.querySelector(".date").textContent = anEvent.acf.date;

          clone.querySelector(".time span").textContent = anEvent.acf.time;

          clone.querySelector(".category").textContent = anEvent.acf.category;

          clone.querySelector(".descript").innerHTML = anEvent.content.rendered;

          clone.querySelector(".location").textContent = anEvent.acf.location;

          clone.querySelector("#price span").textContent = anEvent.acf.price;
          
          

          if (anEvent._embedded["wp:featuredmedia"]) { //img is there
              clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
          } else { // no img
              clone.querySelector("img").remove()
          }

          clone.querySelector('.readmore').href = "subpage.html?id=" + anEvent.id;


          eventList.appendChild(clone);
      }
      fetchEvents();


      //found this stuff online
      setInterval(function () {

          if (bottomVisible() && lookingForData === false) {
              console.log("We've reached rock bottom, fetching articles")
              page++;
              fetchEvents();
          }
      }, 1000)

      function bottomVisible() {
          const scrollY = window.scrollY
          const visible = document.documentElement.clientHeight
          const pageHeight = document.documentElement.scrollHeight
          const bottomOfPage = visible + scrollY >= pageHeight
          return bottomOfPage || pageHeight < visible
      }






