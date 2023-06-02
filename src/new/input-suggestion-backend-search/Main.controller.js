/*global location history */
sap.ui.define([
	"co/bim/zfio_cashsheet/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"co/bim/zfio_cashsheet/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Label",
	"sap/m/library",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/m/Text",
	"sap/m/TextArea",
	"sap/m/Input",
	"sap/ui/core/Core",
	"sap/ui/core/Fragment"
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator, Dialog, Button, Label, mobileLibrary, MessageToast,
	MessageBox, Text, TextArea, Input, Core, Fragment) {
	"use strict";

	var ButtonType = mobileLibrary.ButtonType;
	var DialogType = mobileLibrary.DialogType;

	var oBundle = jQuery.sap.resources({
		url: jQuery.sap.getModulePath("co.bim.zfio_cashsheet") + "/i18n/i18n.properties",
		locale: sap.ui.getCore().getConfiguration().getLanguage()
	});

	return BaseController.extend("co.bim.zfio_cashsheet.controller.Worklist", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			var oViewModel,
				iOriginalBusyDelay,
				oTable = this.byId("dailySalesTable");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
			// keeps the search state
			this._aTableSearchState = [];

			this._screenState = {
				blank: "BLANK",
				unsaved: "NEW",
				saved: "SAVED",
				create: "CREATE",
				edit: "EDIT",
				approved: "APPROVED"
			};

			this._authenticated = false;

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				saveAsTileTitle: this.getResourceBundle().getText("saveAsTileTitle", this.getResourceBundle().getText("worklistViewTitle")),
				shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0,
				state: {
					dailySalesBusy: false,
					incomeBusy: false,
					expensesBusy: false,
					bankBusy: false,
					banknotesBusy: false,
					screen: this._screenState.blank,
					editButton: false,
					printButton: false,
					authenticated: false
				},
				data: {
					tarih: new Date(),
					kasaTarihi: new Date(),
					snote: "",
					magazaNo: "",
					magazaAdi: "",
					cashGrandTotal: "",
					safeDifference: "",
					openingbalexists: true,
					dailySales: [],
					income: [],
					expenses: [],
					bank: [],
					bankNotes: [],
					storeInputSuggestions: []
				}
				//, checkuser: {
				// 	EAuth: "X"
				// }
			});
			this.setModel(oViewModel, "worklistView");
			oViewModel.setSizeLimit(25000);
			this.getOwnerComponent().getModel().setSizeLimit(25000);

			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			oTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});

			// Add the worklist page to the flp routing history
			this.addHistoryEntry({
				title: this.getResourceBundle().getText("worklistViewTitle"),
				icon: "sap-icon://table-view",
				intent: "#KasaDefteri-display"
			}, true);

			this.getRouter().getRoute("worklist").attachPatternMatched(this._onMasterMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		onStoreSuggest: function(oEvent) {
			var query = oEvent.getParameter("suggestValue");
			// Call OData service with the search query
			this._callStoreSearch(query);
		},

		onMagazaChange: function(oEvent) {
			this.getModel("worklistView").setProperty("/data/magazaAdi", "");
			this._initTables();
			var sMagazaNo = oEvent.getParameter("newValue");
			var sRetailStoreName = this.getModel().getProperty("/EtStoresSet('" + sMagazaNo + "')").Retailstorename;
			if (sRetailStoreName) {
				this.getModel("worklistView").setProperty("/data/magazaAdi", sRetailStoreName);
				var dKasaTarihi = this.byId("kasaTarihiDP").getDateValue();
				if (dKasaTarihi) {
					this._fetchData(sMagazaNo, dKasaTarihi);
				}
			}
		},

		_callStoreSearch: function(query) {
			var oDataModel = this.getView().getModel(); 
			var entitySet = "/EtStoresSet";
			var filters = [];

			// Create a filter for searching TextField containing the query
			var filter = new sap.ui.model.Filter("Retailstorename", sap.ui.model.FilterOperator.EQ, query);
			filters.push(filter);

			oDataModel.read(entitySet, {
				filters: filters,
				success: function(data) {
					var suggestions = [];

					// Extract the relevant data from the OData response
					data.results.forEach(function(result) {
						suggestions.push({
							Retailstoreid: result.Retailstoreid,
							Retailstorename: result.Retailstorename
						});
					});

					// var suggestionModel = new sap.ui.model.json.JSONModel();
					// suggestionModel.setData({
					// 	Suggestions: suggestions
					// });
					// this.getView().setModel(suggestionModel, "suggestionModel");
					this.getModel("worklistView").setProperty("/data/storeInputSuggestions", suggestions);
				}.bind(this),
				error: function(error) {
					// Handle error
				}
			});
		},

	});
});