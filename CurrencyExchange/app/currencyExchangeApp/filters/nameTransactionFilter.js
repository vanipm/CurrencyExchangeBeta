'use strict';

define(['app'], function (app) {

    var nameTransactionFilter = function () {

        return function (transactions, filterValue) {
            if (!filterValue) return transactions;

            var matches = [];

            return matches;
        };
    };

    app.filter('nameTransactionFilter', nameTransactionFilter);

});