app.controller('listClients', function ($scope, $state, clientService) {
    var action = {
        action: "getClients"
    };
    clientService.query(action,
        function (retorno) {
            $scope.clients = retorno;
            $scope.totalItems = retorno.length;
            console.log("# of clients", $scope.totalItems);
        },
        function (erro) {
            console.log(erro);
        });

    $scope.Activate = function (id) {
        action = { action: 'activateClient' };
        clientService.update(action, { id: id },
        function (retorno) {
            $state.reload();
        },
        function (erro) {
            console.log(erro);
        });
    };

    $scope.Deactivate = function (id) {
        action = { action: 'deleteClient' };
        clientService.update(action, { id: id },
        function (retorno) {
            $state.reload();
        },
        function (erro) {
            console.log(erro);
        });
    };

    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;

});

app.controller('getClient', function ($scope, clientService) {
    var action = { action: "getClient" };
    var getclient = function ($scope) {
        clientService.get(action, { id: $scope.ClientID },
            function (retorno) {
                $scope.client = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('updateClient', function ($scope, $stateParams, $state, $timeout, toaster, clientService) {
    var action = {
        action: "getClient"
    };
    clientService.get(action, { id: $stateParams.id },
        function (retorno) {
            $scope.client = retorno;
            $scope.ClientID = retorno.ClientID;
            $scope.FirstMidName = retorno.FirstMidName;
            $scope.LastName = retorno.LastName;
            $scope.BirthDate = retorno.BirthDate;
            $scope.Active = retorno.Active;
            console.log("Client", retorno);
        },
        function (erro) {
            console.log(erro);
        });

    $scope.updateClient = function () {
        console.log($scope);
        action = {
            action: "updateClient",
            id: $stateParams.id
        };
        newClient = {
            ClientID: $scope.ClientID,
            FirstMidName: $scope.FirstMidName,
            LastName: $scope.LastName,
            BirthDate: $scope.BirthDate,
            Active: $scope.Active
        };

        clientService.update(action, newClient,
            function (retorno) {
                toaster.pop('warning', "Edit", ("Client Updated "+"("+ $scope.FirstMidName +" "+ $scope.LastName +")"));
                $state.go('clients');
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('insertClient', function ($scope, $state, $timeout, toaster, clientService) {
    var action = { action: "insertClient" };

    $scope.insertClient = function () {
        var client = {
            ClientID: $scope.ClientID,
            FirstMidName: $scope.FirstMidName,
            LastName: $scope.LastName,
            BirthDate: $scope.BirthDate,
            Active: $scope.Active
        };
        clientService.save(action, client,
            function (retorno) {
                toaster.pop('success', "Create", ("New client Created."));
                $state.go('clients');
            },
            function (erro) {
                console.log(erro);
        });
    };
});
