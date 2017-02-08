app.controller('listGenres', function ($scope, genreService) {
    var chaveBusca = {
        action:"getGenres"
    }
     genreService.query(chaveBusca,
        //success
        function (retorno) {
            $scope.genres = retorno;
            
        },
        //error
        function (erro) {
            
            console.log(erro);
        });
});
