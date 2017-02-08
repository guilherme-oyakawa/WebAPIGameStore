app.config(function ($routeProvider) {
    $routeProvider
        .when("/Copies",
            { templateUrl: "../app/view/copies.html" })
        .when("/Genres",
            { templateUrl: "../app/view/genres.html" })
        .when("/Publishers",
            { templateUrl: "../app/view/publishers.html" })
        .when("/Games",
            { templateUrl: "../app/view/games.html" })
        .when("/Clients",
            { templateUrl: "../app/view/clients.html" })
        .when("/Rentals",
            { templateUrl: "../app/view/rentals.html" })
        .when("/Fees",
            { templateUrl: "../app/view/fees.html" })
        .when('/', { templateUrl: "../app/view/home.html" });
});
