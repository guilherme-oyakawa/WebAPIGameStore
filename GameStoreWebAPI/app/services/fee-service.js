app.factory('feeService', function ($resource) {
    return $resource('../api/fees/:action/:id', { action: "@action", id: "@id" },
        {
            update: {
                method: 'PUT'
            }
        });
});