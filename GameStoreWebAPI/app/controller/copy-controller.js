﻿app.controller('listCopies', function ($scope, copyService) {
    var action = {
        action: "getCopies"
    };
    copyService.query(action,
        //success
        function (retorno) {
            $scope.copies = retorno;
            $scope.totalItems = retorno.length;
        },
        //error
        function (erro) {
            console.log(erro);
        });
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;

});

app.controller('listCopiesPerGame', function ($scope, copyService, $stateParams) {
    var action = {
        action: "getCopiesPerGame",
        id: $stateParams.id
    };
    copyService.query(action,

        function (retorno) {
            $scope.copies = retorno;
        },

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


app.controller('insertCopy', function ($scope, $state, toaster, copyService, gameService) {
    var action = {
        action:'getGames'
    };
    $scope.numberOfCopies = 1;

    gameService.query(action,
        function (retorno) {
            $scope.games = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    $scope.insertCopy = function () {
        action = { action: "insertCopy" };
        var copy = {
            GameID: $scope.GameID,
            Available: true
        };

        for (var i = 0; i < $scope.numberOfCopies; i++) {
            copyService.save(action, copy,
                function (retorno) {
                    $scope.copyAdded = retorno;
                },
                function (erro) {
                    console.log(erro);
                });
        }
        toaster.pop("success", "New Copies", "Copies added to database.");
        $state.go('copies');
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