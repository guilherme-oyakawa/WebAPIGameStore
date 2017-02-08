app.controller('listCopies', function ($scope, copyService) {
    var chaveBusca = {
        action:"getCopies"
    }
    copyService.query(chaveBusca,
        //success
        function (retorno) {
            $scope.copies = retorno;
        },
        //error
        function (erro) {
            console.log(erro);
        });
});
