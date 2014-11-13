'use strict';

define(['app', 
        'currencyExchangeApp/services/currenciesService'], function (app) {

    var injectParams = ['config', 'currenciesService'];

    var dataService = function (config, currenciesService) {
        return  currenciesService;
    };

    dataService.$inject = injectParams;

    app.factory('dataService',
        ['config', 'currenciesService', dataService]);

});

