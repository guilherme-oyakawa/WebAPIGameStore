﻿app.controller('listGames', function ($scope, $state, $timeout, toaster, gameService, ModalService) {
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

    //Infinite Scroll
    $scope.Limit = 5;
    $scope.increaseLimit = function () {
        $scope.Limit += 5;
        console.log("increased limit to " + $scope.Limit);
    };

    //modal
    $scope.confirmDelete = null;
    $scope.deleteGame = function (id) {
        action = {
            action: 'deleteGame',
            id: id
        };

        ModalService.showModal({
            templateUrl: "../app/view/modal/confirmDelete.html",
            controller: 'modalController',
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result) {
                    gameService.remove(action,
                    function (retorno) {
                        $scope.gameDeleted = retorno;
                        toaster.pop('error', "Delete","Game Deleted.");
                        },
                    function (erro) {
                        console.log(erro);
                    });
                };
                $state.reload();
            });
        });

        /*gameService.remove(action,
        function (retorno) {
            $scope.gameDeleted = retorno;
            toaster.pop('warning', "Delete", ("Game #" + id + " Deleted."));
            $timeout($state.reload, 1000);
        },
        function (erro) {
            console.log(erro);
        });*/
    };

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

app.controller('updateGame', function ($scope, $stateParams, $state, gameService, ratingService, publisherService, genreService, toaster) {

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
                toaster.pop('warning', "Edit", ("Game #" + $scope.GameID + " Updated."));
                $state.go('games');
                
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('insertGame', function ($scope, $stateParams, $state, gameService, ratingService, publisherService, genreService, toaster) {
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
        var game = {
            Title: $scope.Title,
            Year: $scope.YearDate,
            Description: $scope.Description,
            Value: $scope.Value,
            GenreID: $scope.GenreID,
            PublisherID: $scope.PublisherID,
            ESRBID: $scope.ESRBID
        };
        console.log("Game added", game);
        action = { action: "insertGame" };

        gameService.save(action, game,
            function (retorno) {
                $scope.gameAdded = retorno;
                toaster.pop('success', "Create", ("New game Created."));
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