app.factory('copyService', function ($resource) {
    return $resource('../api/copies/:action/:id', {action: "@action", id: "@id"},
        {
            update: {
                method: 'PUT'
            }
        });
});