'use strict';

define(['app'], function (app) {

    var injectParams = ['$http', '$q'];

    var currenciesFactory = function ($http, $q) {
        var serviceBase = '/api/dataservice/',
            factory = {};


        factory.getCurrencies = function () {
            return $http.get(serviceBase + 'currencies').then(
                function (results) {
                    return results.data;
                });
        };

        factory.getTransactions = function () {
            return $http.get(serviceBase + 'transactions').then(
                function (results) {
                    return results.data;
                });
        };

        factory.insertTransction = function (transaction) {
            return $http.post(serviceBase + 'postTransaction', transaction).then(function (results) {
                
                return results.data;
            });
        };

        factory.newTransaction = function () {
            return $q.when({ id: 0 });
        };

        factory.deleteTransaction = function (id) {
            return $http.delete(serviceBase + 'deleteTransaction/' + id).then(function (status) {
                return status.data;
            });
        };

        function getPagedResource(baseResource, pageIndex, pageSize) {
            var resource = baseResource;
            resource += (arguments.length == 3) ? buildPagingUri(pageIndex, pageSize) : '';
            return $http.get(serviceBase + resource).then(function (response) {
                var trans = response.data;
                extendCustomers(trans);
                return {
                    totalRecords: parseInt(response.headers('X-InlineCount')),
                    results: trans
                };
            });
        }

        function buildPagingUri(pageIndex, pageSize) {
            var uri = '?$top=' + pageSize + '&$skip=' + (pageIndex * pageSize);
            return uri;
        }

        return factory;
    };

    currenciesFactory.$inject = injectParams;

    app.factory('currenciesService', currenciesFactory);

});