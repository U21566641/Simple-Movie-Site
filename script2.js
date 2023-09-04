let movie;
let number = localStorage.getItem("numberInCart");
let currentQuantity = 0;

var navbar = $(".navbar-brand");
var loaded = false;

navbar[1].innerHTML = '<i class="fas fa-shopping-cart"> ' + number + '</i>';
movie = JSON.parse(localStorage.getItem("moviesInCart"));



//Adds new table row for each movie there is in the cart
$.each(movie, function (idx) {
    title = movie[idx].title;//Readability
    price = movie[idx].ticket_price;
    quantity = movie[idx].tickets_in_cart;

    $("tbody").append('<tr><td> <i class="fa-solid fa-circle-minus"></i> ' + title + '</td>'
        + '<td class="unitPrice">' + price + '</td>'
        + '<td class="movieQuantity"> <i class="fa-solid fa-arrow-left"></i> ' + quantity +
        ' <i class="fa-solid fa-arrow-right"></i></td>'
        + '<td class="totalCost">R' + (quantity * price) + '</td></tr>');
    loaded = true;
});

//Displays no movies in cart if there are no movies in cart.
if (loaded == false) {
    $("tbody").append('<tr><td>No movies in your cart.</td></tr>');
}


//Add table footer for total after base table has been built
$("tfoot").append('<tr><td colspan="4" style="text-align:center";>Total: R'
    + localStorage.getItem("totalCost") + ' </td></tr>');


//Remove movie whenever cross button is clicked
$(".fa-circle-minus").click(function () {
    removeMovie(this);

});

$(".fa-arrow-right").click(function () {
    increaseQuantity(this);
    location.reload();

});

$(".fa-arrow-left").click(function () {
    decreaseQuantity(this);
    location.reload();
});

const increaseQuantity = (row) => {

    addPrice = $(row).closest("tr").find(".unitPrice").html()//Price instead of title, easier to code
    for (let x = 0; x < movie.length; x++) {
        if (movie[x].ticket_price == addPrice) {

            //Update number of tickets in cart
            indexOfAdd = x;
            movie[x].tickets_in_cart++;
            localStorage.setItem("moviesInCart", JSON.stringify(movie));

            //Update local storage and cart icon
            number++;
            localStorage.setItem("numberInCart", number);
            navbar[1].innerHTML = '<i class="fas fa-shopping-cart"> ' + number + '</i>';


            //Update total cost as well as corresponding local storage 
            currentPrice = movie[x].ticket_price;
            $(row).closest("tr").find(".totalCost").text(
                'R' + currentPrice * movie[x].tickets_in_cart);

            //Update total in footer as well as localstorage for total cost
            newTotal = movie[x].ticket_price + parseInt(localStorage.getItem("totalCost"));
            localStorage.setItem("totalCost", newTotal);
            $("tfoot").html('<tr><td colspan="4" style="text-align:center";>Total: R'
                + localStorage.getItem("totalCost") + ' </td></tr>');
        }

    }
}

const decreaseQuantity = (row) => {
    Price = $(row).closest("tr").find(".unitPrice").html()//Price instead of title, easier to code
    for (let x = 0; x < movie.length; x++) {
        if (movie[x].ticket_price == Price) {

            //Update number of tickets in cart
            index = x;
            movie[index].tickets_in_cart--;
            localStorage.setItem("moviesInCart", JSON.stringify(movie));
            // $(row).closest("tr").find(".movieQuantity").html(movie[x].tickets_in_cart);

            //Update local storage and cart icon
            number--;
            localStorage.setItem("numberInCart", number);
            navbar[1].innerHTML = '<i class="fas fa-shopping-cart"> ' + number + '</i>';


            //Update total cost as well as corresponding local storage 
            currentPrice = movie[index].ticket_price;
            $(row).closest("tr").find(".totalCost").text(
                'R' + currentPrice * movie[index].tickets_in_cart);

            //Update total in footer as well as localstorage for total cost
            newTotal = parseInt(localStorage.getItem("totalCost")) - movie[index].ticket_price;
            localStorage.setItem("totalCost", newTotal);
            $("tfoot").html('<tr><td colspan="4" style="text-align:center";>Total: R'
                + localStorage.getItem("totalCost") + ' </td></tr>');

            //Checks if quantity is 0 and then deletes from table. couldn't get remove movie
            //function to work so copied over some code from that function.
            if (movie[index].tickets_in_cart == 0) {
                $(row).closest("tr").remove();
                removePrice = $(row).closest("tr").find(".unitPrice").html()//Price instead of title for ease

                for (let x = 0; x < movie.length; x++) {
                    if (movie[x].ticket_price == removePrice) {
                        indexOfRemove = x
                        currentMovies = JSON.parse(localStorage.getItem("moviesInCart"));
                        currentMovies.splice(indexOfRemove, 1);
                        localStorage.setItem("moviesInCart", JSON.stringify(currentMovies));
                    }

                }
            }
        }

    }


}


//Function to remove movie, makes program easier to read
const removeMovie = (row) => {

    //Remove cost of item and update local storage accordingly
    toRemove = parseInt($(row).closest("tr").find(".totalCost").html().slice(1));
    currentCost = localStorage.getItem("totalCost");
    newCost = currentCost - toRemove;
    localStorage.setItem("totalCost", newCost);


    //Remove item from numberInCart, and update number next to cart icon accordingly
    number--;
    localStorage.setItem("numberInCart", number);
    navbar[1].innerHTML = '<i class="fas fa-shopping-cart"> ' + number + '</i>';


    //Remove movie from cart in its entirety and update local storage accordingly
    removePrice = $(row).closest("tr").find(".unitPrice").html()//Price instead of title for ease
    for (let x = 0; x < movie.length; x++) {
        if (movie[x].ticket_price == removePrice) {
            indexOfRemove = x
            currentMovies = JSON.parse(localStorage.getItem("moviesInCart"));
            currentMovies.splice(indexOfRemove, 1);
            localStorage.setItem("moviesInCart", JSON.stringify(currentMovies));
        }

    }


    //Actually remove row from the user's view
    $(row).closest("tr").remove();

    //Update table footer to reflect changes
    $("tfoot").html('<tr><td colspan="4" style="text-align:center";>Total: R'
        + localStorage.getItem("totalCost") + ' </td></tr>');

}


