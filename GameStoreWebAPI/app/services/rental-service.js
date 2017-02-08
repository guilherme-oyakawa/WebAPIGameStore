app.factory('rentalService', function ($resource) {
    return $resource('../api/rentals/:action/:id', { action: "@action", id: "@id" },
        {
            update: {
                method: 'PUT'
            }
        });
});