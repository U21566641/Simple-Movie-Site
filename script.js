var movies = [
    {
        id: 2018042785,
        title: "Avengers: Infinity War",
        director: "Russo brothers",
        runtime: "2h 29m",
        release_year: 2018,
        description: "The Avengers must stop Thanos, " +
            "an intergalactic warlord, from getting his hands on all the infinity stones." +
            "However, Thanos is prepared to go to any lengths to carry out his insane plan.",
        poster_url: "images/InfinityWar.jpg",
        cinema_number: 1,
        ticket_price: 150,
        tickets_in_cart: 0
    },
    {
        id: 2021122498,
        title: "Jujutsu Kaisen 0",
        director: "Sunghoo Park",
        runtime: "1h 45m",
        release_year: 2021,
        description: "Yuta Okkotsu gains control of an extremely powerful, cursed spirit and gets enrolled in the Tokyo Prefectural Jujutsu High School by sorcerers to help him control his power and keep an eye on him.",
        poster_url: "images/Jujutsu Kaisen.jpg",
        cinema_number: 2,
        ticket_price: 100,
        tickets_in_cart: 0
    },
    {
        id: 2019062197,
        title: "Toy Story 4",
        director: "Josh Cooley",
        runtime: "1h 40m",
        release_year: 2019,
        description: "Woody attempts to make Forky, a toy, suffering from existential crisis, realise his importance in the life of Bonnie, their owner. However, things become difficult when Gabby Gabby enters their lives.",
        poster_url: "images/ToyStory4.jpg",
        cinema_number: 3,
        ticket_price: 90,
        tickets_in_cart: 0
    }, {
        id: 2019053098,
        title: "Parasite",
        director: "Bong Joon-ho",
        runtime: "2h 12m",
        release_year: 2019,
        description: "The struggling Kim family sees an opportunity when the son starts working for the wealthy Park family. Soon, all of them find a way to work within the same household and start living a parasitic life.",
        poster_url: "images/Parasite.jpg",
        cinema_number: 4,
        ticket_price: 125,
        tickets_in_cart: 0
    }
]
//variable declarations for relevant card parts
var head = $("header");
var image = $(".image");
var body = $(".body");
var footer = $("footer");

//Creates a card for each movie object
$.each(movies, function (idx) {
    head[idx].innerHTML += ('Cinema ' + movies[idx].cinema_number);
    image[idx].innerHTML += ('<img src="' + movies[idx].poster_url + '" style="width:100%; height:50%" class="" />');
    body[idx].innerHTML += ('<br><h6> ' + movies[idx].title + '</h6><br />');
    body[idx].innerHTML += ('<p>' + movies[idx].description + '</p>');
    body[idx].innerHTML += ('<p style="text-align:right";><b> R' + movies[idx].ticket_price + '</p>');
    footer[idx].innerHTML += ('<button type="button" class="btn btn-outline-primary mb-2" '
        + ' data-toggle="modal" data-target="#modal' + idx + ' ">Show Details</button>');
    footer[idx].innerHTML += ('<br><button type="button" class="btn btn-success" ' +
        'id=' + idx + ' >BOOK TICKET</button> ');
});


var modalTitle = $(".modal-title");
var modalBody = $(".modal-body");

//Populates modals for each movie there is
$.each(movies, function (idx) {
    modalTitle[idx].innerHTML += (movies[idx].title);
    modalBody[idx].innerHTML += ('<b>Title:</b> ' + movies[idx].title + '<br><br>'
        + '<b>Director/s:</b> ' + movies[idx].director + '<br><br>'
        + '<b>Release Year:</b> ' + movies[idx].release_year + '<br><br>'
        + '<b>Runtime:</b> ' + movies[idx].runtime);
});


var ticketPrice = 0;
var moviesInCart = [];
var navbar = $(".navbar-brand");
var i = 1;
$(".btn-success").click(function () {
    ticketPrice += movies[this.id].ticket_price;//Counts ticket price 

    if (moviesInCart.indexOf(movies[this.id]) === -1) {//Checks if movie is already in cart
        moviesInCart.push(movies[this.id])//If not, then it adds it to the cart
    }
    movies[this.id].tickets_in_cart++;//Adds more tickets to the cart

    //Sets local storage with relevant keys and values
    localStorage.setItem("moviesInCart", JSON.stringify(moviesInCart));
    localStorage.setItem("numberInCart", i);
    localStorage.setItem("totalCost", ticketPrice);
    i++;

    //Updates the number next to the shopping icon
    navbar[1].innerHTML = '<i class="fas fa-shopping-cart"> ' + localStorage.getItem("numberInCart") + '</i>';

});


