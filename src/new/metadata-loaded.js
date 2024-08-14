oPrintModel.metadataLoaded().then(function() {
    var sKey = oPrintModel.createKey("/FormPdfSet", {
        "AssignId": sAssignId
    });
    window.open(oPrintModel.sServiceUrl + sKey + "/$value");
}.bind(this));