app.controller('listFees', function ($scope, feeService) {
    var chaveBusca = {
        action: "getFees"
    };
    feeService.query(chaveBusca,
        //success
        function (retorno) {
            $scope.fees = retorno;
        },
        //error
        function (erro) {
            console.log(erro);
        });
});

app.controller('getFee', function ($scope, feeService) {
    var action = { action: "getFee" };
    var getFee = function ($scope) {
        feeService.get(action, { id: $scope.FeeID },
            function (retorno) {
                $scope.fee = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('updateFee', function ($scope, feeService) {
    var action = {
        action: "updateFee",
        id: $scope.FeeID
    };
    var fee = {
        FeeID: $scope.FeeID,
        RentalID: $scope.RentalID,
        Value: $scope.Value,
        Paid: $scope.Paid
    };
    $scope.updateFee = function () {
        feeService.update(action, fee,
            function (retorno) {
                $scope.feeAdded = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('insertFee', function ($scope, feeService) {
    var action = { action: "insertFee" };
    var fee = {
        FeeID: $scope.FeeID,
        RentalID: $scope.RentalID,
        Value: $scope.Value,
        Paid: $scope.Paid
    };
    $scope.insertFee = function () {
        feeService.save(action, fee,
            function (retorno) {
                $scope.feeUpdated = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deleteFee', function ($scope, feeService) {
    var action = { action: 'deleteFee' };
    var deleteFee = function ($scope) {
        feeService.remove(action, { id: $scope.FeeID },
        function (retorno) {
            $scope.feeDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});