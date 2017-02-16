app.controller('listGenres', function ($scope, $state, $timeout, toaster, genreService, ModalService) {
    var action = {
        action: "getGenres"
    };
     genreService.query(action,
        function (retorno) {
            $scope.genres = retorno;      
        },
        function (erro) {
            console.log(erro);
        });

     $scope.deleteGenre = function (id) {
         action = {
             action: 'deleteGenre',
             id: id
         };

         ModalService.showModal({
             templateUrl: "../app/view/modal/confirmDelete.html",
             controller: 'modalController',
         }).then(function (modal) {
             modal.element.modal();
             modal.close.then(function (result) {
                 if (result) {
                     genreService.remove(action,
                     function (retorno) {
                         //$scope.gameDeleted = retorno;
                         toaster.pop('error', "Delete", "Genre Deleted.");
                     },
                     function (erro) {
                         console.log(erro);
                     });
                 };
                 $timeout(function(){
                     $state.reload();
                 },500);
                 
             });
         });

     };

});

app.controller('getGenre', function ($scope, genreService) {
    var action = { action: "getGenre" };
    var getGenre = function ($scope) {
        genreService.get(action, { id: $scope.GenreID },
            function (retorno) {
                $scope.genre = retorno;
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('insertGenre', function ($scope, $state, toaster, genreService) {
    var action = { action: "insertGenre" };
    $scope.GenreName;
    $scope.insertGenre = function () {
        genreService.save(action, { Name: $scope.GenreName },
            function (retorno) {
                $scope.genreAdded = retorno;
                toaster.pop('success', "Create", ("New Genre Created "+"(" + $scope.GenreName + ")"));
                $state.go('genres');
            },
            function (erro) {
                console.log(erro);
            });
    };
});

app.controller('deleteGenre', function ($scope, genreService) {
    var action = { action: "deleteGenre" };
    var deleteGenre = function ($scope) {
        genreService.remove(action, { id: $scope.GenreID },
        function (retorno) {
            $scope.genreDeleted = retorno;
        },
        function (erro) {
            console.log(erro);
        });
    };
});