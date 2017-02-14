app.controller('listRentals', function ($scope, rentalService) {
    var chaveBusca = {
        action: "getRentals"
    };
    rentalService.query(chaveBusca,
        function (retorno) {
            $scope.rentals = retorno;
        },
        function (erro) {
            console.log(erro);
        });
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

app.controller('updateRental', function ($scope, rentalService) {
    var action = {
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
    $scope.updateRental = function () {
        rentalService.update(action, rental,
            function (retorno) {
                $scope.rentalAdded = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});


app.controller('insertRental', function ($scope, rentalService) {
    var action = { action: "insertRental" };
    var rental = {
        RentalID: $scope.RentalID,
        LentOn: $scope.LentOn,
        DueDate: $scope.DueDate,
        Price: $scope.Price,
        ReturnedOn: $scope.ReturnedOn,
        ClientID: $scope.ClientID,
        CopyID: $scope.CopyID
    };
    var insertRental = function ($scope) {
        rentalService.save(action, rental,
            function (retorno) {
                $scope.rentalUpdated = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deleteRental', function ($scope, rentalService) {
    var action = { action: 'deleteRental' };
    $scope.deleteRental = function () {
        rentalService.remove(action, { id: $scope.RentalID },
        function (retorno) {
            $scope.rentalDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});