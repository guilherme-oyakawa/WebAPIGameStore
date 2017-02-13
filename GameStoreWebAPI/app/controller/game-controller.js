﻿app.controller('listGames', function ($scope, gameService) {
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

app.controller('updateGame', function ($scope, $stateParams, $state, gameService, ratingService, publisherService, genreService) {

    var game;
    var action = {action: "getGame"};
    gameService.get(action, { id: $stateParams.id },
        function (retorno) {
            $scope.GameID = retorno.GameID;
            $scope.game = retorno;
            $scope.Title = retorno.Title;
            $scope.YearDate = retorno.Year;
            $scope.Description = retorno.Description;
            $scope.Value = retorno.Value;
            $scope.GenreID = retorno.GenreID;
            $scope.PublisherID = retorno.PublisherID;
            $scope.ESRBID = retorno.RatingID;
            console.log(retorno);
        },
        function (erro) {
            console.log(erro);
        });

    ratingService.query({ action: "getRatings" },
        function (retorno) {
            $scope.ratings = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    publisherService.query({ action: "getPublishers" },
        function (retorno) {
            $scope.publishers = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    genreService.query({ action: "getGenres" },
        function (retorno) {
            $scope.genres = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    $scope.updateGame = function () {
        console.log($scope);
        action = {
            action: "updateGame",
            id: $stateParams.id
        };
        game = {
            GameID: $stateParams.id,
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
                $state.go('games');
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

app.controller('insertGame', function ($scope, $stateParams, $state, gameService, ratingService, publisherService, genreService) {
    var action;

    $scope.Title = "Insert title here";
    $scope.YearDate;
    $scope.Description = "Insert brief description here";
    $scope.Value = 0;
    $scope.GenreID;
    $scope.PublisherID;
    $scope.ESRBID = 1;

    ratingService.query({ action: "getRatings" },
        function (retorno) {
            $scope.ratings = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    publisherService.query({ action: "getPublishers" },
        function (retorno) {
            $scope.publishers = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    genreService.query({ action: "getGenres" },
        function (retorno) {
            $scope.genres = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    $scope.insertGame = function () {
        console.log("B4", $scope);
        var game = {
            Title: $scope.Title,
            Year: $scope.YearDate,
            Description: $scope.Description,
            Value: $scope.Value,
            GenreID: $scope.GenreID,
            PublisherID: $scope.PublisherID,
            ESRBID: $scope.ESRBID
        };
        console.log("Game added?", game);
        action = { action: "insertGame" };

        gameService.save(action, game,
            function (retorno) {
                $scope.gameAdded = retorno;
                console.log("Game Added", retorno);
                $state.go('games');
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