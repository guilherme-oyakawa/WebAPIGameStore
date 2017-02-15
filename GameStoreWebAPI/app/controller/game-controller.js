app.controller('listGames', function ($scope, $state, $timeout, $filter, toaster, gameService, copyService, ModalService) {
    var action = {
        action: "getGames"
    };

    $scope.filtered = new Array(0);
    gameService.query(action,
        function (retorno) {
            $scope.games = retorno;
            $scope.filtered = retorno;
            $scope.totalItems = retorno.length;
        },
        function (erro) {
            console.log(erro);
        });

    $scope.deleteGame = function (id) {
        action = {
            action: 'deleteGame',
            id: id
        };

        ModalService.showModal({
            templateUrl: "../app/view/modal/confirmDelete.html",
            controller: 'modalController'
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
                }
                $state.reload();
            });
        });
    };
    
    $scope.getCopiesPerGame = function (id) {
        action = {
            action: "getCopiesPerGame",
            id: id
        };
        copyService.query(action,
        function (retorno) {
        });
    };

    //Pagination

    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    console.log($scope.numPages);
    filterGame = function (games, filter) {
        return $filter('filter')($scope.games, $scope.search);
    };

    $scope.$watch('search', function () {
        $scope.filtered = filterGame($scope.games, $scope.search);
        if ($scope.filtered != null) {
            //console.log("Filtered Items", $scope.filtered);
            $scope.totalItems = $scope.filtered.length;
            //console.log("Length", $scope.totalItems);
            $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
        }
    }, true
    );

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
        newGame = {
            GameID: $scope.GameID,
            Title: $scope.Title,
            Year: $scope.YearDate,
            Description: $scope.Description,
            Value: $scope.Value,
            GenreID: $scope.GenreID,
            PublisherID: $scope.PublisherID,
            ESRBID: $scope.ESRBID
        };
        gameService.update(action, newGame,
            function (retorno) {
                $scope.gameUpdated = retorno;
                toaster.pop('warning', "Edit", "Game #" + $scope.GameID + "("+ $scope.Title +")" + " Updated.");
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
                //$scope.gameAdded = retorno;
                toaster.pop('success', "Create", "New game Created.");
                $state.go('games');
            },
            function (erro) {
                console.log(erro);
            });
       
    };
});
