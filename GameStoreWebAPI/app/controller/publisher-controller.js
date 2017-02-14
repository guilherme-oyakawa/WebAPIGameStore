app.controller('listPublishers', function ($scope, $state, $timeout, toaster, publisherService, ModalService) {
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

    $scope.deletePublisher = function (id) {
        action = {
            action: 'deletePublisher',
            id: id
        };

        ModalService.showModal({
            templateUrl: "../app/view/modal/confirmDelete.html",
            controller: 'modalController',
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                if (result) {
                    publisherService.remove(action,
                    function (retorno) {
                        //$scope.gameDeleted = retorno;
                        toaster.pop('error', "Delete", "Publisher Deleted.");
                    },
                    function (erro) {
                        console.log(erro);
                    });
                };
                $timeout("", 500);
                $state.go('publishers');
            });
        });

    };

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

app.controller('insertPublisher', function ($scope, $state, toaster, publisherService) {
    var action = { action: "insertPublisher" };
    $scope.PublisherName;
    $scope.insertPublisher = function () {
        publisherService.save(action, { Name: $scope.PublisherName },
            function (retorno) {
                //$scope.PublisherAdded = retorno;
                toaster.pop('success', "Create", ("New Genre Created " + "(" + $scope.PublisherName + ")"));
                $state.go('publishers');
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