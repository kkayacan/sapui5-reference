this._oDataModel.read(sPath, {
    success: jQuery.proxy(function(oData, oResponse) {
        if (oResponse.headers["sap-message"]) {
            var oSapMessage = JSON.parse(oResponse.headers["sap-message"]);
            if (oSapMessage.code === "SV/018") {
                MessageToast.show(this._oResourceBundle.getText("ReleasedMessage"));
            } else {
                sap.m.MessageBox.error(oSapMessage.message);
            }
        }
        // Evaluate the response only if the request has not been invalidated in the meantime (e.g. by setting a new filter)
        if (!(this._mPendingProductRequests[iNextNumber] && this._mPendingProductRequests[iNextNumber].invalidated)) {
            // Merge the new products into the buffer
            if (!mOptions.SuppressBufferUpdate) {
                var aResults = jQuery.map(oData.results, function(oItem) {
                    return jQuery.extend({}, oItem);
                });
                this.appendNewProducts(aResults);
            }

            this.onRequestCompleted(mOptions.InBackground, mOptions.InBackground, bOnlyProdTableBusy);
            if (typeof fnSuccess === "function") {
                fnSuccess(oData, oResponse);
            }
        }
        if (this._mPendingProductRequests[iNextNumber]) {
            delete this._mPendingProductRequests[iNextNumber];
        }
    }, this),
    error: jQuery.proxy(function(oError) {
        // Evaluate the response only if the request has not been invalidated in the meantime (e.g. by setting a new filter)
        if (!(this._mPendingProductRequests[iNextNumber] && this._mPendingProductRequests[iNextNumber].invalidated)) {
            this.onRequestCompleted(mOptions.InBackground, mOptions.InBackground, bOnlyProdTableBusy);
            if (typeof fnError === "function") {
                fnError(oError);
            }
        }
        if (this._mPendingProductRequests[iNextNumber]) {
            delete this._mPendingProductRequests[iNextNumber];
        }
    }, this),
    filters: oFilter ? oFilter.aFilters : null,
    urlParameters: mUrlParameters
});