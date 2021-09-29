onItemDelete: function(oEvent) {
    var sPath = oEvent.getParameter("listItem").getBindingContextPath();
    var idx = parseInt(sPath.substring(sPath.lastIndexOf("/") + 1), 10);
    this.getModel("createView").getData().data.items.splice(idx, 1);
    this.getModel("createView").refresh(true);
}