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

app.controller('getPublisher', function ($scope, publisherService) {
    var action = { action: "getPublisher" };
    var getPublisher = function ($scope) {
        publisherService.get(action, { id: $scope.PublisherID },
            function (retorno) {
                $scope.publisher = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('insertPublisher', function ($scope, publisherService) {
    var action = { action: "insertPublisher" };
    var insertPublisher = function ($scope) {
        publisherService.save(action, { Name: $scope.PublisherName },
            function (retorno) {
                $scope.PublisherAdded = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deletePublisher', function ($scope, publisherService) {
    var action = { action: 'deletePublisher' };
    var deletePublisher = function ($scope) {
        publisherService.remove(action, { id: $scope.PublisherID },
        function (retorno) {
            $scope.publisherDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});