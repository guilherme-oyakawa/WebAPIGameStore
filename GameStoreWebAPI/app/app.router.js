
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/Home');

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
        name: 'genres',
        url: '/Genres',
        templateUrl: "../app/view/genres.html"
    },
    {
        name: 'publishers',
        url: '/Publishers',
        templateUrl: "../app/view/publishers.html"
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
        name: 'gameCopies',
        url: '/Games/:id/Copies',
        templateUrl: '../app/view/gameCopies.html'
    },

    {
        name: 'clients',
        url: '/Clients',
        templateUrl: "../app/view/clients.html"
    },

    {
        name: 'rentals',
        url: '/Rentals',
        templateUrl: "../app/view/rentals.html"
    },
    {
        name: 'fees',
        url: '/Fees',
        templateUrl: "../app/view/fees.html"
    }];

    states.forEach(function (state) {
        $stateProvider.state(state);
    })

});