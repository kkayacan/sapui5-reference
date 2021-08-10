var sKey = this.getModel().createKey("/SpotFormSet", {
    IBusinessdaydate: oItem.Businessdaydate,
    IRetailstoreid: oItem.Retailstoreid
});
window.open(this.getModel().sServiceUrl + sKey + "/$value");