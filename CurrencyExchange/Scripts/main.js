require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'currencyExchangeApp/animations/listAnimations',
        'app',
        'currencyExchangeApp/directives/wcUnique',
        'currencyExchangeApp/services/routeResolver',
        'currencyExchangeApp/services/config',
        'currencyExchangeApp/services/newsDataService',
        'currencyExchangeApp/services/authService',
        'currencyExchangeApp/services/currenciesService',
        'currencyExchangeApp/services/dataService',
        'currencyExchangeApp/services/modalService',
        'currencyExchangeApp/services/httpInterceptors',
        'currencyExchangeApp/filters/nameTransactionFilter',
        'currencyExchangeApp/controllers/navbarController'

    ],
    function () {
        angular.bootstrap(document, ['currencyExchangeApp']);
    });
