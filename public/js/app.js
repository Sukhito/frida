var app = angular.module('frida',['ui.router','ui.bootstrap']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise('');
    
    $stateProvider
        // .state('nav',{
        //     url: '',
        //     templateUrl: 'js/navigation/index.html'
        // })
        .state('items',{
            url: '/items',
            templateUrl: 'js/items/index.html',
            controller: 'ItemCtrl'
        })
        .state('receipts',{
            url: '/receipts',
            templateUrl: 'js/receipts/index.html',
            controller:'ReceiptCtrl'
        })
        .state('sales',{
            url: '/sales',
            templateUrl: 'js/sales/index.html',
            controller:'SaleCtrl'
        })
    //     })
    //     .state('catalog',{
    //         url: '/catalog',
    //         templateUrl: 'js/catalog/index.html',
    //         controller:'CatalogCtrl'
    //     })
    //     .state('contact',{
    //         url: '/contacts',
    //         templateUrl: 'js/contacts/index.html',
    //         controller:'ContactCtrl'
    //     })

    //     .state('invoices',{
    //         url: '/invoices',
    //         templateUrl: 'js/invoices/index.html',
    //         controller:'InvoiceCtrl'
    //     })
    //     .state('invoices.detail',{
    //         url: '/:invoiceId',
    //         templateUrl : 'js/invoices/invoice/index.html',
    //         controller: 'InvoiceDetailCtrl'
    //     })
    //     .state('invoices-detail-edit',{
    //         url: '/invoices/:invoiceId/edit',
    //         templateUrl : 'js/invoices/invoice-edit/index.html',
    //         controller: 'InvoiceDetailEditCtrl'
    //     })
    $locationProvider.hashPrefix('');
});

app.filter('startFrom',function(){
    return function(data, start){
        return data.slice(start);
    }
});