app.controller('listRentals', function ($scope, $timeout, $state, toaster, rentalService) {
    var action = {
        action: "getRentals"
    };
    rentalService.query(action,
        function (retorno) {
            $scope.rentals = retorno;
            $scope.totalItems = retorno.length;
        },
        function (erro) {
            console.log(erro);
        });

    $scope.returnRental = function (id) {
        action = {
            action: "returnRental",
            id: id
        };
        rentalService.update(action,
            function (retorno) {
                console.log("Returned successfully.");
            },
            function (erro) {
                console.log(erro);
            });
        toaster.pop("success", "Return", "Returned successfully.");
        $timeout(function () {
            $state.reload();
        }, 500);
    };

    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;

    console.log($scope.itemsPerPage);
    console.log($scope.currentPage);

});

app.controller('getRental', function ($scope, rentalService) {
    var action = { action: "getRental" };
    var getRental = function ($scope) {
        rentalService.get(action, { id: $scope.RentalID },
            function (retorno) {
                $scope.rental = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('updateRental', function ($scope, $stateParams, $state, $timeout, rentalService, copyService, clientService) {
    var action = {
        action: "getRental"
    };

    rentalService.get(action, {id: $stateParams.id},
        function (retorno) {
            $scope.RentalID = retorno.RentalID;
            $scope.rental = retorno;
            $scope.LentOn = retorno.LentOn;
            $scope.DueDate = retorno.DueDate;
            $scope.Price = retorno.Price;
            $scope.ReturnedOn = retorno.ReturnedOn;
            $scope.ClientID = retorno.ClientID;
            $scope.CopyID = retorno.CopyID;
            console.log(retorno);
        },
        function (erro) {
            console.log(erro);
        });
    
    action = { action: 'getAvailableCopies' };
    copyService.query(action,
        function (retorno) {
            $scope.copies = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    action = { action: 'getActiveClients' };
    clientService.query(action,
        function (retorno) {
            $scope.clients = retorno;
        },
        function (erro) {
            console.log(erro);
        });



    $scope.updateRental = function () {
        action = {
            action: "updateRental",
            id: $scope.RentalID
        };

        var rental = {
            RentalID: $scope.RentalID,
            LentOn: $scope.LentOn,
            DueDate: $scope.DueDate,
            Price: $scope.Price,
            ReturnedOn: $scope.ReturnedOn,
            ClientID: $scope.ClientID,
            CopyID: $scope.CopyID
        };

        rentalService.update(action, rental,
            function (retorno) {
                console.log(retorno);
            },
            function (erro) {
                console.log(erro);
            });
        $timeout(function () {
            $state.go('rentals');
        }, 500);
        
    };
});


app.controller('insertRental', function ($scope, $state, $timeout, toaster, rentalService, copyService, clientService) {
    var action;
    
    action = { action: 'getAvailableCopies' };
    copyService.query(action,
        function (retorno) {
            $scope.copies = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    action = { action: 'getActiveClients' };
    clientService.query(action,
        function (retorno) {
            $scope.clients = retorno;
        },
        function (erro) {
            console.log(erro);
        });

    $scope.insertRental = function () {
        action = { action: "insertRental" };

        var rental = {
            LentOn: $scope.LentOn,
            DueDate: $scope.DueDate,
            Price: $scope.Price,
            ReturnedOn: null,
            ClientID: $scope.ClientID,
            CopyID: $scope.CopyID
        };
        rentalService.save(action, rental,
            function (retorno) {
                console.log(retorno);
            },
            function (erro) {
                console.log(erro);
            });
        $timeout(function () {
            $state.go('rentals');
        }, 500);
    };
});
