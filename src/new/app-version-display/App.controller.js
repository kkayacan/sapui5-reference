sap.ui.define([
	"co/bim/zqm_manageinspectionlots/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("co.bim.zqm_manageinspectionlots.controller.App", {

		onInit: function () {
			var oViewModel,
				fnSetAppNotBusy,
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			// Get application version from manifest
			var sVersion = this.getOwnerComponent().getManifestEntry("/sap.app/applicationVersion/version");

			oViewModel = new JSONModel({
				busy: true,
				delay: 0,
				version: sVersion
			});
			this.setModel(oViewModel, "appView");

			fnSetAppNotBusy = function () {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};

			// disable busy indication when the metadata is loaded and in case of errors
			this.getOwnerComponent().getModel().metadataLoaded().
			then(fnSetAppNotBusy);
			this.getOwnerComponent().getModel().attachMetadataFailed(fnSetAppNotBusy);

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			// Inject CSS for version text fade out animation
			var sCss = "@keyframes fadeOut { 0% { opacity: 0.7; } 80% { opacity: 0.7; } 100% { opacity: 0; } } " +
				".versionText { position: fixed; bottom: 5px; right: 20px; font-size: 10px; color: #999999; " +
				"z-index: 9999; animation: fadeOut 6s forwards; pointer-events: none; }";
			var oStyle = document.createElement("style");
			oStyle.innerText = sCss;
			document.head.appendChild(oStyle);
		}
	});

});