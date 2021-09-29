onNewItemPress: function(oEvent) {
    var oViewModel = this.getModel("createView");
    oViewModel.getData().data.items.push({});
    oViewModel.refresh(true);
    var aItems = this.byId("itemsTable").getItems();
    for (var i = 0; i < aItems.length; i++) {
        var oItem = aItems[i];
    }
    $.sap.delayedCall(500, this, function() {
        this.byId("page").scrollToElement(oItem, 200);
    });
},