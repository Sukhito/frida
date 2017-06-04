app.factory('SaleService',function($http){
    return{
        getSales: function(){
            return $http.get('api/sales');
        },
        createSales: function(newItem){
            return $http.post('api/sales',newItem);
        }
    }
})