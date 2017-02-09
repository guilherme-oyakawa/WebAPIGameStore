/*app.config(function ($routeProvider) {
    $routeProvider
        .when("../Copies",
            { templateUrl: "../app/view/copies.html" })
        .when("../Genres",
            { templateUrl: "../app/view/genres.html" })
        .when("../Publishers",
            { templateUrl: "../app/view/publishers.html" })
        .when("../Games",
            { templateUrl: "../app/view/games.html" })
        .when("../Clients",
            { templateUrl: "../app/view/clients.html" })
        .when("../Rentals",
            { templateUrl: "../app/view/rentals.html" })
        .when("../Fees",
            { templateUrl: "../app/view/fees.html" })
        .when('../', { templateUrl: "../app/view/home.html" });
});*/

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/Home');

    var homeState = {
        name: 'home',
        url: '/Home',
        templateUrl: "../app/view/home.html"
    };

    var copiesState = {
        name: 'copies',
        url: '/Copies',
        templateUrl: "../app/view/copies.html"
    };

    var genresState = {
        name: 'genres',
        url: '/Genres',
        templateUrl: "../app/view/genres.html"
    };

    var publishersState = {
        name: 'publishers',
        url: '/Publishers',
        templateUrl: "../app/view/publishers.html"
    };

    var gamesState = {
        name: 'games',
        url: '/Games',
        templateUrl: "../app/view/games.html"
    };

    var clientsState = {
        name: 'clients',
        url: '/Clients',
        templateUrl: "../app/view/clients.html"
    };

    var rentalsState = {
        name: 'rentals',
        url: '/Rentals',
        templateUrl: "../app/view/rentals.html"
    };

    var feesState = {
        name: 'fees',
        url: '/Fees',
        templateUrl: "../app/view/fees.html"
    };

    $stateProvider.state(homeState);
    $stateProvider.state(copiesState);
    $stateProvider.state(feesState);
    $stateProvider.state(rentalsState);
    $stateProvider.state(clientsState);
    $stateProvider.state(gamesState);
    $stateProvider.state(publishersState);
    $stateProvider.state(genresState);

});