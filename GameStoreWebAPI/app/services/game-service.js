app.factory('gameService', function ($resource) {
    return $resource('../api/games/:action/:id', { action: "@action", id: "@id" },
        {
            update: {
                method: 'PUT'
            }
        });
});