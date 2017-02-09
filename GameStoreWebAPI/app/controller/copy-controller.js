app.controller('listCopies', function ($scope, copyService) {
    var chaveBusca = {
        action: "getCopies"
    };
    copyService.query(chaveBusca,
        //success
        function (retorno) {
            $scope.copies = retorno;
        },
        //error
        function (erro) {
            console.log(erro);
        });
});

app.controller('getCopy', function ($scope, copyService) {
    var action = { action: "getCopy" };
    var getCopy = function ($scope) {
        copyService.get(action, { id: $scope.CopyID },
            function (retorno) {
                $scope.copy = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('updateCopy', function ($scope, CopyService) {
    var action = {
        action: "editCopy",
        id: $scope.CopyID
    };
    var copy = {
        Available: true,
        GameID: $scope.GameID
    };
    var insertCopy = function ($scope) {
        CopyService.update(action, copy,
            function (retorno) {
                $scope.copyAdded = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});


app.controller('insertCopy', function ($scope, CopyService) {
    var action = { action: "insertCopy" };
    var copy = {
        Available: true,
        GameID: $scope.GameID
    };
    var insertCopy = function ($scope) {
        CopyService.save(action, copy,
            function (retorno) {
                $scope.copyUpdated = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deleteCopy', function ($scope, CopyService) {
    var action = { action: 'deleteCopy' };
    var deleteCopy = function ($scope) {
        CopyService.remove(action, { id: $scope.CopyID },
        function (retorno) {
            $scope.copyDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});