app.controller('ItemCtrl',function($scope,ItemService,$uibModal ){

    $scope.search = function (row) {
        return (angular.lowercase(row.code).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
                angular.lowercase(row.name).indexOf(angular.lowercase($scope.query) || '') !== -1);
    };

    ItemService.getItems().then(
        function(response){
            $scope.items = response.data;
        }
    )

    $scope.selectItem = function(selectedItem){
        editItemModal(selectedItem);
    }

    $scope.newItem = function(){
        var newItem = {
            name:"",
            code:"",
            price:0
        }

        newItemModal(newItem);
    }

    var newItemModal = function(newItem){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl : "js/items/new-item.html",
            controller : function($scope, $uibModalInstance,newItem){
                $scope.item = newItem;

                $scope.save = function(){
                    ItemService.createItem($scope.item).then(
                        function(response){
                            if(response.data){
                                alert("success");
                                $scope.item = response.data;
                                $uibModalInstance.close($scope.item);
                            }else{
                                alert("failed");
                            }
                        }
                    )
                }

                $scope.cancel = function(){
                    $uibModalInstance.dismiss("cancel");
                }

            },
            size : "lg",
            resolve : {
                newItem : function(){
                    return newItem;
                }
            }
        })

        modalInstance.result.then(
            function(item){
                $scope.items.push(item);
            },function(){

            }
        )
    }

    var editItemModal = function(selectedItem){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl : "js/items/select-item.html",
            controller : function($scope, $uibModalInstance,item){
                $scope.item = item;

                var temp = null;

                $scope.edit = function(){
                    $scope.editMode = true;
                    temp = angular.copy(item);
                }

                $scope.save = function(){
                    $scope.editMode = false;

                    ItemService.updateItem($scope.item).then(function(response){
                        if(response.data){
                            alert("Success");
                        }else{
                            alert("Failed");
                        }
                    })
                }

                $scope.cancel = function(){
                    $scope.editMode = false;

                    item.name = temp.name;
                    item.code = temp.code;
                    item.price = temp.price;
                }

                $scope.section = function(prices){
                    return prices.split("|");
                }

                $scope.addPrice = function(prices){
                    newPrice = {
                        unit : "",
                        nominal : 0
                    };
                    prices.push(newPrice);
                }

                $scope.deletePrice = function(index,prices){
                    prices.splice(index,1)
                }

            },
            size : "lg",
            resolve : {
                item : function(){
                    return selectedItem;
                }
            }
        })

        modalInstance.result.then(
            function(){

            },function(){

            }
        )
    }
    });