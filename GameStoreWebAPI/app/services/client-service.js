app.factory('clientService', function ($resource) {
    return $resource('../api/clients/:action/:id', { action: "@action", id: "@id" });
});