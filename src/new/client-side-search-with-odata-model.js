this._oDialog.bindAggregation("items", {
    path: "/LtLabeltypesSet",
    template: this._oDialog.getItems()[0].clone(),
    parameters: {
        operationMode: "Client"
    }
});