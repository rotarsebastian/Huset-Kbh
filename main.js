function fetchData(){
    fetch("http://wordpress.quickcocktails.dk/wp-json/wp/v2/used_cars")
    .then( e => e.json())
}