let back = document.querySelector("body");
let main = document.querySelector("main");
let appBar = document.querySelector(".appbar");
let urlParams = new URLSearchParams(window.location.search);

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
let eventList = document.querySelector("#singleEvent");
let page = 1;
let lookingForData = false;

let id = urlParams.get("id");
console.log("i want to get article: " + id);



function fetchEvents() {
    lookingForData = true;



    let endpoint = "http://wordpress.quickcocktails.dk/wp-json/wp/v2/events/" + id
    fetch(endpoint)
        .then(e => e.json())
        .then(showSinglePost);


}








function showSinglePost(aPost) {
    console.log(aPost);
    let clone = template.cloneNode(true);


    clone.querySelector("#title").textContent = aPost.title.rendered;

    clone.querySelector(".date").textContent = aPost.acf.date;

    clone.querySelector(".time span").textContent = aPost.acf.time;

    clone.querySelector(".category").textContent = aPost.acf.category;

    clone.querySelector(".descript").innerHTML = aPost.content.rendered;

    clone.querySelector(".location").textContent = aPost.acf.location;

    clone.querySelector("#price span").textContent = aPost.acf.price;



    //show eventsection
    document.querySelector("#singleEvent").classList.add("goToEvent");

    /*if (aPost._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        clone.querySelector("img").remove()
    }*/

    eventList.appendChild(clone);
}

fetchEvents();

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
