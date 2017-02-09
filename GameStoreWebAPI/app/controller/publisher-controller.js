app.controller('listPublishers', function ($scope, publisherService) {
    var chaveBusca = {
        action: "getPublishers"
    };
    publisherService.query(chaveBusca,
        function (retorno) {
            $scope.publishers = retorno;
        },
        function (erro) {
            console.log(erro);
        });
});

app.controller('insertPublisher', function ($scope, publisherService) {
    var action = { action: "insertPublisher" };
    publisherService.save(action, { Name: $scope.PublisherName },
        function (retorno) {
            $scope.PublisherAdded = retorno;
        },
        function (erro) {
            console.log(erro);
        });
});

app.controller('deletePublisher', function ($scope, publisherService) {
    var action = { action: 'deletePublisher' };
    publisherService.remove(action, { id: $scope.PublisherID },
        function (retorno) {
            $scope.publisherDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
});