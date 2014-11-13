'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope', 'newsDataService'];

    var AboutController = function ($scope, newsDataService) {
        $scope.newsitems = [];

        function init() {

            $scope.newsitems = newsDataService.NewsData;
        }

        init();
    };

    AboutController.$inject = injectParams;

    app.register.controller('AboutController', AboutController);

});