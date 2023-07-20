onInit: function() {

    // Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
    this._mViewSettingsDialogs = {};

},

handleFilterButtonPressed: function() {
    this.getViewSettingsDialog("co.arteis.posreport.fragment.FilterDialog")
        .then(function(oViewSettingsDialog) {
            this.getView().addDependent(oViewSettingsDialog);
            oViewSettingsDialog.open();
        }.bind(this));
},

getViewSettingsDialog: function(sDialogFragmentName) {
    var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

    if (!pDialog) {
        pDialog = Fragment.load({
            id: this.getView().getId(),
            name: sDialogFragmentName,
            controller: this
        }).then(function(oDialog) {
            if (Device.system.desktop) {
                oDialog.addStyleClass("sapUiSizeCompact");
            }
            return oDialog;
        });
        this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
    }
    return pDialog;
},

onCalendarSelect: function(oEvent) {
    this.dStartDate = oEvent.getSource().getSelectedDates()[0].getProperty("startDate");
    this.dEndDate = oEvent.getSource().getSelectedDates()[0].getProperty("endDate");
    if (!this.dEndDate) {
        this.dEndDate = new Date(this.dStartDate.getTime());
    }
    var iDayCount = ((this.dEndDate.getTime() - this.dStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    var aFilterItems = oEvent.getSource().getParent().getParent().getParent().getParent().getFilterItems();
    for (var i = 0; i < aFilterItems.length; i++) {
        if (aFilterItems[i].getProperty("key") === "Businessdaydate") {
            aFilterItems[i].setFilterCount(iDayCount);
            aFilterItems[i].setSelected(true);
            break;
        }
    }
},

handleFilterDialogConfirm: function(oEvent) {
    var oTable = this.byId("table"),
        mParams = oEvent.getParameters(),
        oBinding = oTable.getBinding("items"),
        aFilters = [];

    mParams.filterItems.forEach(function(oItem) {
        if (oItem.getId().includes("RetailstoreidFilterItem")) {
            aFilters.push(new Filter("Retailstoreid", "EQ", oItem.getKey()));
        } else if (oItem.getId().includes("BusinessdaydateFilterItem")) {
            aFilters.push(new Filter("IvBeginDate", "EQ", sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy-MM-dd"
            }).format(this.dStartDate)));
            aFilters.push(new Filter("IvEndDate", "EQ", sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy-MM-dd"
            }).format(this.dEndDate)));
        }
    }.bind(this));

    // apply filter settings
    oBinding.filter(aFilters);
    if (oBinding.isSuspended()) {
        oBinding.resume();
    }

    // update filter bar
    // this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
    // this.byId("vsdFilterLabel").setText(mParams.filterString);
},