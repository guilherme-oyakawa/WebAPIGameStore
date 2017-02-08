app.factory('genreService', function ($resource) {
    return $resource('../api/genres/:action/:id', {action: "@action", id: "@id"});
});