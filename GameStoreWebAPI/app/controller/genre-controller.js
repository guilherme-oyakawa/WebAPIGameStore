app.controller('listGenres', function ($scope, genreService) {
    var chaveBusca = {
        action: "getGenres"
    };
     genreService.query(chaveBusca,
        function (retorno) {
            $scope.genres = retorno;      
        },
        function (erro) {
            console.log(erro);
        });
});

app.controller('getGenre', function ($scope, genreService) {
    var action = { action: "getGenre" };
    var getGenre = function ($scope) {
        genreService.get(action, { id: $scope.GenreID },
            function (retorno) {
                $scope.genre = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('insertGenre', function ($scope, genreService) {
    var action = { action: "insertGenre"};
    var insertGenre = function ($scope) {
        genreService.save(action, { Name: $scope.GenreName },
            function (retorno) {
                $scope.genreAdded = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deleteGenre', function ($scope, genreService) {
    var action = { action: "deleteGenre" };
    var deleteGenre = function ($scope) {
        genreService.remove(action, { id: $scope.GenreID },
        function (retorno) {
            $scope.genreDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});