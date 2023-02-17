onSavePress: function(oEvent) {
    var oViewModel = this.getModel("worklistView");
    sap.ui.core.BusyIndicator.show();
    var aDailysalesSet = oViewModel.getProperty("/data/dailySales").map(function(oItem) {
        return {
            Code: oItem.Code,
            Storecome: oItem.Storecome
        };
    }.bind(this));
    var aBanknotesSet = oViewModel.getProperty("/data/dailySales").map(function(oItem) {
        return {
            Type: oItem.Type,
            Quantity: parseInt(oItem.Count, 10)
        };
    }.bind(this));
    var oDocument = {
        IBusinessdaydate: sap.ui.core.format.DateFormat.getDateInstance({
            pattern: "yyyy-MM-dd"
        }).format(this.byId("kasaTarihiDP").getDateValue()),
        IRetailstoreid: this.byId("magazaInput").getValue(),
        EtDailysalesSet: aDailysalesSet,
        EtBanknotesSet: aBanknotesSet
    };
    this.getModel().create("/SaveDailyStoreData", oDocument, {
        success: function(oData, oResponse) {
            oViewModel.setProperty("/state/screen", this._screenState.saved);
            sap.ui.core.BusyIndicator.hide();
        }.bind(this),
        error: function(oError) {
            sap.ui.core.BusyIndicator.hide();
        }
    });
},