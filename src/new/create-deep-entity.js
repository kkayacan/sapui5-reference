onOrderPress: function(oEvent) {
    var oViewModel = this.getModel("createView");
    oViewModel.setProperty("/page/busy", true);
    var aItPoItemSet = oViewModel.getProperty("/data/items").map(function(oItem) {
        return {
            Matnr: oItem.Matnr,
            Menge: this.convertToFloat(oItem.Menge, 2),
            Brtwr: this.convertToFloat(oItem.Brtwr, 2),
            TaxPercent: oItem.TaxPercent
        };
    }.bind(this));
    var oDocument = {
        Application: "SOSPO",
        Aedat: oViewModel.getProperty("/data/Aedat"),
        Ihrez: oViewModel.getProperty("/data/Ihrez"),
        ItPoItemSet: aItPoItemSet
    };
    this.getView().getModel().create("/IsPoHeadSet", oDocument, {
        success: function(oData, oResponse) {
            oViewModel.setProperty("/page/editable", false);
            this._documentNumber = oData.Ebeln;
            this.startUpload();
            oViewModel.setProperty("/page/busy", false);
            sap.m.MessageToast.show(this.getResourceBundle().getText("savedMessage"));
        }.bind(this),
        error: function(oError) {
            oViewModel.setProperty("/page/busy", false);
        }.bind(this)
    });

}