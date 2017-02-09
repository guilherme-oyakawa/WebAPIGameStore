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

app.controller('getGame', function ($scope, gameService) {
    var action = { action: "getGame" };
    var getGame = function ($scope) {
        gameService.get(action, { id: $scope.GameID },
            function (retorno) {
                $scope.game = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('updateGame', function ($scope, CopyService) {
    var action = {
        action: "editGame",
        id: $scope.GameID
    };
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
    var insertCopy = function ($scope) {
        CopyService.update(action, game,
            function (retorno) {
                $scope.gameUpdated = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

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