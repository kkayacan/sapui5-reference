var sKey = this.getModel().createKey("/EsCashJournalSet", {
    Businessdaydate: new Date(Date.UTC(dTarih.getFullYear(), dTarih.getMonth(), dTarih.getDate())),
    Retailstoreid: sMagaza
});

this.getModel().read(sKey, {
    urlParameters: {
        "$expand": "EtSalesSummarySet,EtPaymentSummarySet,EtCashPaymentSet,EtExpenseSet,EtBankTransferSet"
    },
    success: function (oData, oResponse) {
        debugger;
        // oViewModel.getData().doc = oData;
        // oViewModel.refresh(true);
        // oViewModel.setProperty("/busy", false);
    }.bind(this),
    error: function (oResponse) {
        debugger;
        // oViewModel.setProperty("/busy", false);
    }
});