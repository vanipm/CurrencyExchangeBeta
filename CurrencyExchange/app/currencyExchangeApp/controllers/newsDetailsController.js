'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope', '$location', '$routeParams',
                        '$timeout', 'newsDataService'];


    var NewsDetailsController = function ($scope, $location, $routeParams, $timeout, newsDataService) {

       var newsitems = [];

       var newsItemId = $routeParams.itemid;
        
        function init() {
            newsitems = newsDataService.NewsData;
            for (var i = 0; i < newsitems.length ; i++) {
                if(newsitems[i].date === newsItemId)
                {
                    $scope.newsitem = newsitems[i];
                }
            }

        }

        init();
    };

   NewsDetailsController.$inject = injectParams;

   app.register.controller('NewsDetailsController', NewsDetailsController);

});