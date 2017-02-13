app.controller('modalController', ['$scope', 'close', function ($scope, close) {
    $scope.close = function (result) {
        close(result, 500);
    };
}]);