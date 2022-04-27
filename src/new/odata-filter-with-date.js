onDateChange: function (oEvent) {
    var oItemBinding = this.byId("table").getBinding("items");
    oItemBinding.filter(new sap.ui.model.Filter({
        path: "Businessdaydate",
        operator: sap.ui.model.FilterOperator.EQ,
        value1: sap.ui.core.format.DateFormat.getDateInstance({
            pattern: "yyyy-MM-dd"
        }).format(oEvent.getSource().getDateValue())
    }));
}