app.controller('listPublishers', function ($scope, publisherService) {
    var chaveBusca = {
        action:"getPublishers"
    }
    publisherService.query(chaveBusca,
        function (retorno) {
            $scope.publishers = retorno;
        },
        function (erro) {
            console.log(erro);
        });
})