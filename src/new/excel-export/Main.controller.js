onExport: function() {
    var aCols, oRowBinding, oSettings, oSheet, oTable;

    if (!this._oTable) {
        this._oTable = this.byId("table");
    }

    oTable = this._oTable;
    oRowBinding = oTable.getBinding("items");
    aCols = this.createColumnConfig();
    
    var aItems = [];
    this.byId("table").getItems().forEach(function(oItem){
    aItems.push(oItem.getBindingContext().getObject());
    });

    oSettings = {
        workbook: {
            columns: aCols,
            hierarchyLevel: "Level"
        },
        dataSource: aItems, //oRowBinding,
        count: aItems.length,
        fileName: "kasa-raporu.xlsx",
        worker: false // We need to disable worker because we are using a MockServer as OData Service
    };

    oSheet = new Spreadsheet(oSettings);
    oSheet.build().finally(function() {
        oSheet.destroy();
    });
},

createColumnConfig: function() {
    var aCols = [];
    
    aCols.push({
        label: this.getResourceBundle().getText("Retailstorename"),
        type: EdmType.String,
        property: "Retailstorename"
    });
    
    aCols.push({
        label: this.getResourceBundle().getText("Businessdaydate"),
        property: "Businessdaydate",
        type: EdmType.Date
    });
    
    aCols.push({
        label: this.getResourceBundle().getText("TenderDescription"),
        type: EdmType.String,
        property: "TenderDescription"
    });
    
    aCols.push({
        label: this.getResourceBundle().getText("Transcurrency"),
        type: EdmType.String,
        property: "Transcurrency"
    });

    aCols.push({
        label: this.getResourceBundle().getText("Salesamount"),
        type: EdmType.Number,
        property: "Salesamount"
    });

    return aCols;
}