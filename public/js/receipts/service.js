app.factory('ReceiptService',function($http){
    return{
        getReceipts: function(){
            return $http.get('api/receipts');
        },
        createReceipt: function(newItem){
            return $http.post('api/receipts',newItem);
        }
    }
})