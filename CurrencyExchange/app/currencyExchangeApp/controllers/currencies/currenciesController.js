'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope', '$location', '$filter', '$window',
                        '$timeout', 'authService', 'dataService', 'modalService'];
    
    var CurrenciesController = function ($scope, $location, $filter, $window,
                                        $timeout, authService, dataService, modalService) {

        $scope.transactions = [];
        $scope.currencies = [];
        $scope.filteredCount = 0;
        $scope.reverse = false;
        $scope.searchText = null;
        $scope.orderAmount = 25000;
        $scope.cardAnimationClass = '.card-animation';

        //paging
        $scope.totalRecords = 0;
        $scope.pageSize = 10;
        $scope.currentPage = 1;

        $scope.pageChanged = function (page) {
            $scope.currentPage = page;
                     
        };


        function getCurrencies() {
            dataService.getCurrencies().then(function (currencies) {
                $scope.currencies = currencies;
            }, processError);
        }

        function getTransactions() {
            dataService.getTransactions().then(function (transactions) {
                $scope.transactions = transactions;
            }, processError);
        }

        $scope.addBidOrder = function (bid, currency) {
            var order = {};

            order.side = "SELL";
            order.currency  = currency;
            order.amount = $scope.orderAmount;
            order.price = bid;
            order.ordertime = new Date();

            $scope.transactions.push(order);
        }

        $scope.addAskOrder = function (ask, currency) {
            var order = {};

            order.side = "BUY";
            order.currency = currency;
            order.amount = $scope.orderAmount;
            order.price = ask;
            order.ordertime = new Date();

            $scope.transactions.push(order);
        }

        $scope.deleteTransaction = function (id) {
            if (!authService.user.isAuthenticated) {
                $location.path(authService.loginPath + $location.$$path);
                return;
            }

            var transaction = getTransactionById(id);

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Transaction',
                headerText: 'Delete ' + currency + '?',
                bodyText: 'Are you sure you want to delete this transaction?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    dataService.deleteTransaction(id).then(function () {
                        for (var i = 0; i < $scope.transactions.length; i++) {
                            if ($scope.transactions[i].id === id) {
                                $scope.transactions.splice(i, 1);
                                break;
                            }
                        }
                        filterTransactions($scope.searchText);
                    }, function (error) {
                        $window.alert('Error deleting transaction: ' + error.message);
                    });
                }
            });
        };

        $scope.DisplayModeEnum = {
            Card: 0,
            List: 1
        };

        $scope.changeDisplayMode = function (displayMode) {
            switch (displayMode) {
                case $scope.DisplayModeEnum.Card:
                    $scope.listDisplayModeEnabled = false;
                    break;
                case $scope.DisplayModeEnum.List:
                    $scope.listDisplayModeEnabled = true;
                    break;
            }
        };

        $scope.navigate = function (url) {
            $location.path(url);
        };

        $scope.setOrder = function (orderby) {
            if (orderby === $scope.orderby) {
                $scope.reverse = !$scope.reverse;
            }
            $scope.orderby = orderby;
        };

        $scope.searchTextChanged = function () {
            filterTransactions($scope.searchText);
        };

        function init() {
            getCurrencies();
            getTransactions();
            $timeout(quoteTimer, 500);
        }

        //function createWatches() {
        //    //Watch searchText value and pass it and the transactionss to nameCurrencyFilter
        //    //Doing this instead of adding the filter to ng-repeat allows it to only be run once (rather than twice)
        //    //while also accessing the filtered count via $scope.filteredCount above

        //    //Better to handle this using ng-change on <input>. See searchTextChanged() function.
        //    $scope.$watch("searchText", function (filterText) {
        //        filterTransactions(filterText);
        //    });
        //}

        function getNextPricing() {
                $timeout(function () {
                    $scope.cardAnimationClass = ''; //Turn off animation since it won't keep up with filtering
                }, 1000);

        }

        function filterTransactions(filterText) {
            $scope.filteredCustomers = $filter("nameCurrencyFilter")($scope.customers, filterText);
            $scope.filteredCount = $scope.filteredCustomers.length;
        }

        function getTransactionById(id) {

            return null;
        }


        function processError(error) {
            $scope.errorMessage = error.message;
            startTimer();
        }

        var quoteTimer = function () {
            quoteUpdater();
            $timeout(quoteTimer, 500);
        }

        function quoteUpdater() {
            var newBid = 0, newAsk = 0;
            for(var i= 0; i < $scope.currencies.length ; i++)
            { 
                generateQuote($scope.currencies[i]);
            }
        }

        function generateQuote(quote) {
            var rnd = Math.random() / 10;
            quote.originalbid = quote.originalbid || quote.bid;
            quote.originalask = quote.originalask || quote.ask;
            quote.bid = round(rnd % 2 == 0 ? quote.originalbid + rnd : quote.originalbid - rnd, 4);
            quote.ask = round(rnd % 2 == 0 ? quote.originalask + rnd : quote.originalask - rnd, 4);
        }

        function round(num, dec) {
            return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        }


        function startTimer() {
            timer = $timeout(function () {
                $timeout.cancel(timer);
                $scope.errorMessage = '';
                $scope.updateStatus = false;
            }, 3000);
        }

        init();
    };

    CurrenciesController.$inject = injectParams;

    app.register.controller('CurrenciesController', CurrenciesController);

});