﻿app.controller('listCopies', function ($scope, copyService) {
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

app.controller('listCopiesPerGame', function ($scope, copyService, $stateParams) {
    var chaveBusca = {
        action: "getCopiesPerGame",
        id: $stateParams.id
    };
    copyService.query(chaveBusca,
        //success
        function (retorno) {
            console.log("CopiesPerGame", retorno);
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

app.controller('updateCopy', function ($scope, copyService) {
    var action = {
        action: "updateCopy",
        id: $scope.CopyID
    };
    var copy = {
        CopyID: $scope.CopyID,
        Available: $scope.Available,
        GameID: $scope.GameID
    };
    $scope.updateCopy = function () {
        copyService.update(action, copy,
            function (retorno) {
                $scope.copyUpdated = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});


app.controller('insertCopy', function ($scope, copyService) {
    var action = { action: "insertCopy" };
    var copy = {
        Available: true,
        GameID: $scope.GameID
    };
    $scope.insertCopy = function () {
        copyService.save(action, copy,
            function (retorno) {
                $scope.copyAdded = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deleteCopy', function ($scope, copyService) {
    var action = { action: 'deleteCopy' };
    var deleteCopy = function () {
        copyService.remove(action, { id: $scope.CopyID },
        function (retorno) {
            $scope.copyDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});