app.controller('ReceiptCtrl',function($scope,ReceiptService, ItemService, $uibModal,$log,$document ){
    $scope.pageSize = 5;
    $scope.currentPage = 1;

	ReceiptService.getReceipts().then(
        function(response){
            $scope.receipts = response.data;
        }
    )

	$scope.newReceipt = function(){
        var newReceipt = {
            'date':new Date(),
            'receiptItems':[]
        }

        newReceiptModal(newReceipt);
    }

    var newReceiptModal = function(newReceipt){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl : "js/receipts/new-receipt.html",
            controller : function($scope, $uibModalInstance,newReceipt){
                ItemService.getItems().then(
                    function(response){
                        $scope.items = response.data;
                    }
                )

                $scope.receipt = newReceipt;


                $scope.save = function(){

                    var ri = $scope.receipt.receiptItems;

                    for(var i = 0 ; i < $scope.receipt.receiptItems.length; i++){
                        var id = ri[i].item;
                        var newBalance = ri[i].newBalance;

                        ItemService.updateItemBalance(id,{balance : newBalance});

                    }

                    ReceiptService.createReceipt($scope.receipt).then(
                        function(response){
                            if(response.data){
                                alert("success");
                                response.data.date = new Date(response.data.date);
                                $scope.receipt = response.data;
                                $uibModalInstance.close($scope.receipt);
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
                                newReceipt.receiptItems.push({
                                    item: tempSelected._id,
                                    name : tempSelected.name,
                                    code : tempSelected.code,
                                    qty : qty,
                                    oldBalance : tempSelected.balance,
                                    newBalance : +qty + +tempSelected.balance
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
                newReceipt : function(){
                    return newReceipt;
                }
            }
        })

        modalInstance.result.then(
            function(receipt){
                $scope.receipts.splice(0,0,receipt);
            },function(){

            }
        )
    }

    $scope.selectReceipt = function(selectedReceipt){
        viewReceiptModal(selectedReceipt);
    }

    var viewReceiptModal = function(selectedReceipt){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl : "js/receipts/select-receipt.html",
            controller : function($scope,receipt){
                $scope.receipt = receipt;
            },
            size : "md",
            resolve : {
                receipt : function(){
                    return selectedReceipt;
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