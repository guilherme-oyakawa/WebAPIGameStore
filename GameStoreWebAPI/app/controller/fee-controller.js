app.controller('listFees', function ($scope, $state, $timeout, toaster, feeService) {
    var action = {
        action: "getFees"
    };
    feeService.query(action,
        //success
        function (retorno) {
            $scope.fees = retorno;
        },
        //error
        function (erro) {
            console.log(erro);
        });

    $scope.payFee = function (id) {
        action = {
            action: "payFee",
            id: id
        };
        feeService.update(action,
            function (retorno) {
                console.log(retorno);
            },
            function (erro) {
                console.log(erro);
        });
        toaster.pop('success', "Fee", "Fee paid.");
        $timeout(500);
        $state.reload();
    };

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