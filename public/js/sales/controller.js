app.controller('SaleCtrl',function($scope,SaleService, ItemService, $uibModal ){
    $scope.pageSize = 5;
    $scope.currentPage = 1;

	SaleService.getSales().then(
        function(response){
            $scope.sales = response.data;
        }
    )

    $scope.newSale = function(){
        var newSale = {
            'date':new Date(),
            'saleItems':[]
        }

        newSaleModal(newSale);
    }

    var newSaleModal = function(newSale){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl : "js/sales/new-sale.html",
            controller : function($scope, $uibModalInstance,newSale){
                ItemService.getItems().then(
                    function(response){
                        $scope.items = response.data;
                    }
                )

                $scope.sale = newSale;


                $scope.save = function(){

                    var si =$scope.sale.saleItems;

                    for(var i = 0 ; i < $scope.sale.saleItems.length; i++){
                        var id = si[i].item;
                        var newBalance = si[i].newBalance;

                        ItemService.updateItemBalance(id,{balance : newBalance});

                    }

                    SaleService.createSales($scope.sale).then(
                        function(response){
                            if(response.data){
                                alert("success");
                                response.data.date = new Date(response.data.date);
                                $scope.sale = response.data;
                                $uibModalInstance.close($scope.sale);
                            }else{
                                alert("failed");
                            }
                        }
                    )
                }

                $scope.cancel = function(){
                    $uibModalInstance.dismiss("cancel");
                }

                var tempSelected = null;

                $scope.onSelect = function(a,b,c){
                    tempSelected = $scope.selected;
                }
                $scope.evaluate = function(){

                    var lastChar = $scope.selected.substr($scope.selected.length - 1);
                    if(lastChar === '.'){
                        var gotEqualSign = $scope.selected.indexOf('=') > -1;
                        //if equal sign exist
                        if(gotEqualSign){
                            var qty = $scope.selected.split("=").pop().slice(0,-1);
                            var qtyIsNumber = !isNaN(qty);
                            //qty exist and a number
                            if(qtyIsNumber && qty !== ''){

                                newSale.saleItems.push({
                                    item: tempSelected._id,
                                    name : tempSelected.name,
                                    code : tempSelected.code,
                                    qty : qty,
                                    oldBalance : tempSelected.balance,
                                    newBalance : +tempSelected.balance - +qty
                                });
                                $scope.selected=null;
                                tempSelected =null;
                            }
                        }
                    }
                }

            },
            size : "lg",
            resolve : {
                newSale : function(){
                    return newSale;
                }
            }
        })

        modalInstance.result.then(
            function(sale){
                $scope.sales.splice(0,0,sale);
            },function(){

            }
        )
    }
    
    $scope.selectSale = function(selectedSale){
        viewSaleModal(selectedSale);
    }

    var viewSaleModal = function(selectedSale){
        console.log(selectedSale);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl : "js/sales/select-sale.html",
            controller : function($scope,sale){
                $scope.sale = sale;
            },
            size : "md",
            resolve : {
                sale : function(){
                    return selectedSale;
                }
            }
        })

        modalInstance.result.then(
            function(){

            },function(){

            }
        )
    }

})