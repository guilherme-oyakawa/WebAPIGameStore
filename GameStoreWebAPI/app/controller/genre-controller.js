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

app.controller('insertGenre', function ($scope, genreService) {
    var action = { action: "insertGenre"};
    genreService.save(action, { Name: $scope.GenreName }, 
        function (retorno) {
            $scope.genreAdded = retorno;
        },
        function (erro) {
            console.log(erro);
        });
});

app.controller('deleteGenre', function ($scope, genreService) {
    var action = { action: "deleteGenre" };
    genreService.remove(action, { id: $scope.GenreID },
        function (retorno) {
            $scope.genreDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
});