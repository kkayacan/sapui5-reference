onCashCountLiveChange: function(oEvent) {
    var _oInput = oEvent.getSource();
    var val = _oInput.getValue();
    val = val.replace(/[^\d]/g, "");
    _oInput.setValue(val);
}