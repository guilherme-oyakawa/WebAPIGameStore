app.factory('publisherService', function ($resource) {
    return $resource('../api/publishers/:action/:id', { action: "@action", id: "@id" });
});