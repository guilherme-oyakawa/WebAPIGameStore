app.factory('ratingService', function ($resource) {
    return $resource('../api/ESRBs/:action/:id', { action: "@action", id: "@id" });
});