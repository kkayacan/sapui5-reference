_getMaterialData: function(sMatnr, oEventSource) {
    this.getModel().callFunction("/GetMaterialData", {
        method: "POST",
        urlParameters: {
            "Matnr": sMatnr
        },
        success: function(oData, response) {
            var sPath = this.getItemBindingPath(oEventSource, "itemsTable", "createView");
            var oItemData = this.getModel("createView").getProperty(sPath);
            oItemData.Maktx = oData.Maktx;
            oItemData.Meins = oData.Meins;
            this.getModel("createView").refresh(true);
        }.bind(this),
        error: function(oError) {}.bind(this)
    });
}