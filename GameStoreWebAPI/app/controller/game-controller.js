app.controller('listGames', function ($scope, gameService) {
    var action = {
        action: "getGames"
    };
    gameService.query(action,
        function (retorno) {
            $scope.games = retorno;
        },
        function (erro) {
            console.log(erro);
        });
});

app.controller('getGame', function ($scope, gameService, $stateParams) {
    var action = { action: "getGame" };
    gameService.get(action, { id: $stateParams.id },
        function (retorno) {
            $scope.game = retorno;
        },
        function (erro) {
            console.log(erro);
        });
});

app.controller('updateGame', function ($scope, gameService) {

    var game;
    var action = {
        action: "updateGame",
        id: $scope.GameID
    };

    /*
    $scope.Title = 
    $scope.YearDate = 
    $scope.Description = 
    $scope.Value = 
    $scope.GenreID = 
    $scope.PublisherID = 
    $scope.ESRBID = 
    */

    var insertGame = function ($scope) {

        game = {
            GameID: $scope.GameID,
            Title: $scope.Title,
            Year: $scope.YearDate,
            Description: $scope.Description,
            Value: $scope.Value,
            GenreID: $scope.GenreID,
            PublisherID: $scope.PublisherID,
            ESRBID: $scope.ESRBID
        };

        gameService.update(action, game,
            function (retorno) {
                $scope.gameUpdated = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});


/* TEST UPDATE API FUNCTION

app.controller('testUpdate', function ($scope, gameService) {
    var action = {
        action: "updateGame",
        id: 4
    };
    var game = {
        GameID: 4,
        Description: "updated",
        GenreID: 3,
        PublisherID: 3,
        ESRBID: 3,
        Title: "ARMS",
        Value: 49.99,
        Year: "2017-05-16T00:00:00"
    };
    gameService.update(action, game,
            function (retorno) {
                $scope.gameUpdated = retorno;
            },
            function (erro) {
                console.log(erro);
            });
});
*/

app.controller('insertGame', function ($scope, gameService) {
    var action = { action: "insertGame" };

    var game = {
        GameID: $scope.GameID,
        Title: $scope.Title,
        Year: $scope.YearDate,
        Description: $scope.Description,
        Value: $scope.Value,
        GenreID: $scope.GenreID,
        PublisherID: $scope.PublisherID,
        ESRBID: $scope.ESRBID
    };

    var insertgame = function ($scope) {
        gameService.save(action, game,
            function (retorno) {
                $scope.gameAdded = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deleteGame', function ($scope, gameService) {
    var action = { action: 'deletegame' };
    var deleteGame = function ($scope) {
        gameService.remove(action, { id: $scope.gameID },
        function (retorno) {
            $scope.gameDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});