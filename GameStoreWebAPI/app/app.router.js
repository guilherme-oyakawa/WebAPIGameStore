
app.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/Home');
    $urlRouterProvider.otherwise('/Games');

    var states =[
    {
        name: 'home',
        url: '/Home',
        templateUrl: "../app/view/home.html"
    },
    {
        name: 'copies',
        url: '/Copies',
        templateUrl: "../app/view/copies.html"
    },
    {
        name: 'gameCopies',
        url: '/Games/:id/Copies',
        templateUrl: '../app/view/gameCopies.html'
    },
    {
        name: 'newCopy',
        url: '/NewCopy',
        templateUrl: "../app/view/newCopy.html"
    },
    {
        name: 'genres',
        url: '/Genres',
        templateUrl: "../app/view/genres.html"
    },
    {
        name: 'newGenre',
        url: '/NewGenre',
        templateUrl: "../app/view/newGenre.html"
    },
    {
        name: 'publishers',
        url: '/Publishers',
        templateUrl: "../app/view/publishers.html"
    },
    {
        name: 'newPublisher',
        url: '/NewPublisher',
        templateUrl: "../app/view/newPublisher.html"
    },
    {
        name: 'games',
        url: '/Games',
        templateUrl: "../app/view/games.html"
    },
    {
        name: 'game',
        url: '/Games/:id',
        templateUrl: '../app/view/game.html'
    },
    {
        name: 'newGame',
        url: '/NewGame',
        templateUrl: '../app/view/newGame.html'
    },
    {
        name: 'clients',
        url: '/Clients',
        templateUrl: "../app/view/clients.html"
    },
    {
        name: 'client',
        url: '/Clients/:id',
        templateUrl: '../app/view/client.html'
    },
    {
        name: 'newClient',
        url: '/newClient',
        templateUrl: '../app/view/newClient.html'
    },
    {
        name: 'rentals',
        url: '/Rentals',
        templateUrl: "../app/view/rentals.html"
    },
    {
        name: 'rental',
        url: '/Rental/:id',
        templateUrl: "../app/view/rental.html"
    },
    {
        name: 'newRental',
        url: '/NewRental',
        templateUrl: "../app/view/newRental.html"
    },
    {
        name: 'fees',
        url: '/Fees',
        templateUrl: "../app/view/fees.html"
    }
    ];

    states.forEach(function (state) {
        $stateProvider.state(state);
    })

});