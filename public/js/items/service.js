app.factory('ItemService',function($http){
    return{
        getItems: function(){
            return $http.get('api/items');
        },
        createItem: function(newItem){
            return $http.post('api/items',newItem);
        },
        updateItem : function(item){
            return $http.put('api/items/' + item._id,item);
        },
        getItem : function(id){
            return $http.get('api/items/' + id);
        },
        updateItemBalance : function(id, newBalance){
            return $http.put('api/items/' + id + '/balance',newBalance);
        }
    }
})