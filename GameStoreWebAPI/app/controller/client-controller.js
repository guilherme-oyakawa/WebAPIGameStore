app.controller('listClients', function ($scope, clientService) {
    var action = {
        action: "getClients"
    };
    clientService.query(action,
        function (retorno) {
            $scope.clients = retorno;
        },
        function (erro) {
            console.log(erro);
        });
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

app.controller('updateClient', function ($scope, clientService) {
    var action = {
        action: "updateClient",
        id: $scope.ClientID
    };
    var client = {
        ClientID: $scope.ClientID,
        FirstMidName: $scope.FirstMidName,
        LastName: $scope.LastName,
        BirthDate: $scope.BirthDate,
        Active: $scope.active
    };
    var updateClient = function ($scope) {
        clientService.update(action, client,
            function (retorno) {
                $scope.clientUpdated = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('insertClient', function ($scope, clientService) {
    var action = { action: "insertClient" };

    var client = {
        ClientID: $scope.ClientID,
        FirstMidName: $scope.FirstMidName,
        LastName: $scope.LastName,
        BirthDate: $scope.BirthDate,
        Active: $scope.active
    };

    var insertClient = function ($scope) {
        clientService.save(action, client,
            function (retorno) {
                $scope.clientAdded = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deleteClient', function ($scope, clientService) {
    var action = { action: 'deleteClient' };
    var deleteClient = function ($scope) {
        clientService.remove(action, { id: $scope.ClientID },
        function (retorno) {
            $scope.clientDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});