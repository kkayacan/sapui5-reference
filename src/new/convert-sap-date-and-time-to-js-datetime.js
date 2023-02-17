var oFirstItem = oTable.getItems()[0].getBindingContext().getObject();
var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
    pattern: "yyyy-MM-dd"
});
var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
    pattern: "HH:mm:ss"
});
var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
var dateStr = dateFormat.format(new Date(oFirstItem.Erdat.getTime() + TZOffsetMs));
var timeStr = timeFormat.format(new Date(oFirstItem.Erzet.ms + TZOffsetMs));
var dFetchTime = new Date(dateStr + " " + timeStr);
var sFetchTime = sap.ui.core.format.DateFormat.getDateInstance({
    relative: true,
    relativeScale: "minute"
}).format(dFetchTime);
this.getModel("worklistView").setProperty("/targetFetchTime", this.getResourceBundle().getText("fetchTime", sFetchTime));