onUnlockPress: function(oEvent) {
    var sUserName = this.byId("usernameInput").getValue();
    sap.ui.core.BusyIndicator.show();
    this.getView().getModel().read("/UnlockUser", {
        filters: [new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.EQ, sUserName)],
        success: function(oData, oResponse) {
            var aErrorDetails = oData.results.map(function(oItem) {
                return {
                    severity: oItem.Type === "E" ? "error" : oItem.Type === "S" ? "success" : "none",
                    message: oItem.Message
                };
            });

            this.getOwnerComponent()._oErrorHandler._showServiceError({
                "responseText": JSON.stringify({
                    "error": {
                        "innererror": {
                            "errordetails": aErrorDetails
                        }
                    }
                })
            });
            sap.ui.core.BusyIndicator.hide();
        }.bind(this),
        error: function(oResponse) {
            sap.ui.core.BusyIndicator.hide();
        }
    });
}