sap.ui.define([
	"sap/ui/base/Object",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/MessageType",
	"sap/m/MessageItem",
	"sap/m/MessageView",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/Bar",
	"sap/m/Text"
], function (UI5Object, MessageBox, JSONModel, MessageType, MessageItem, MessageView, Button, Dialog, Bar, Text) {
	"use strict";

	return UI5Object.extend("co.arteis.sfstckmaintcds.controller.ErrorHandler", {

		/**
		 * Handles application errors by automatically attaching to the model events and displaying errors when needed.
		 * @class
		 * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
		 * @public
		 * @alias com.socar.centralpr.controller.ErrorHandler
		 */
		constructor: function (oComponent, sModelName) {
			this._oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
			this._oComponent = oComponent;
			if (sModelName) {
				this._oModel = oComponent.getModel(sModelName);
			} else {
				this._oModel = oComponent.getModel();
			}
			this._bMessageOpen = false;
			this._sErrorText = this._oResourceBundle.getText("errorText");
			if (this._sErrorText === "errorText") {
				this._sErrorText = "ERROR";
			}

			this._oModel.attachMetadataFailed(function (oEvent) {
				var oParams = oEvent.getParameters();
				this._showServiceError(oParams.response);
			}, this);

			this._oModel.attachRequestFailed(function (oEvent) {
				var oParams = oEvent.getParameters();
				// An entity that was not found in the service is also throwing a 404 error in oData.
				// We already cover this case with a notFound target so we skip it here.
				// A request that cannot be sent to the server is a technical error that we have to handle though
				if (oParams.response.statusCode !== "404" || (oParams.response.statusCode === "404" && oParams.response.responseText.indexOf(
						"Cannot POST") === 0) || (oParams.response.statusCode === "404" && oParams.response.responseText.indexOf(
						"Resource not found for the segment") > 0) || (oEvent.getParameter("method") === "DELETE")) {
					this._showServiceError(oParams.response);
				}
			}, this);
		},

		/**
		 * Shows a {@link sap.m.MessageBox} when a service call has failed.
		 * Only the first error message will be display.
		 * @param {string} sDetails a technical error to be displayed on request
		 * @private
		 */
		_showServiceError: function (sDetails) {
			if (this._bMessageOpen) {
				return;
			}
			this._bMessageOpen = true;
			this._displayMessageView(this._getMessageList(sDetails));
		},

		_getMessageList: function (oDetails) {
			var aList = [];
			if (oDetails.hasOwnProperty("responseText")) {
				var sResponseText = oDetails.responseText;
				try {
					var oResponse = $.parseJSON(sResponseText);
					if (oResponse.error.innererror.hasOwnProperty("errordetails") && oResponse.error.innererror.errordetails.length > 0) {
						aList = oResponse.error.innererror.errordetails;
					} else {
						aList.push({
							message: oResponse.error.message.value,
							severity: "error"
						});
					}
				} catch (oJsonParseError) {
					try {
						var aHtmlError = $.parseHTML(sResponseText);
						aList.push({
							message: aHtmlError[1].innerText,
							severity: "error"
						});
					} catch (oHtmlParseError) {
						aList.push({
							message: this._sErrorText,
							severity: "error"
						});
					}
				}
			} else {
				if (oDetails.statusText) {
					aList.push({
						message: oDetails.statusText,
						severity: "error"
					});
				} else {
					try {
						var aBody = $.parseHTML(oDetails.body);
						aList.push({
							message: aBody[1].innerText,
							severity: "error"
						});
					} catch (oHtmlParseError) {
						if (oDetails.body) {
							aList.push({
								message: oDetails.body,
								severity: "error"
							});
						} else {
							aList.push({
								message: this._sErrorText,
								severity: "error"
							});
						}
					}
				}
			}

			return aList;
		},

		_displayMessageView: function (aMsg) {
			var that = this;

			aMsg.forEach(function (oMsg) {
				switch (oMsg.severity) {
				case "error":
					oMsg.severity = MessageType.Error;
					break;
				case "information":
					oMsg.severity = MessageType.Information;
					break;
				case "success":
					oMsg.severity = MessageType.Success;
					break;
				case "warning":
					oMsg.severity = MessageType.Warning;
					break;
				default:
					oMsg.severity = MessageType.None;
				}
			});

			var oMessageTemplate = new MessageItem({
				type: "{severity}",
				title: "{message}",
				description: "{description}",
				subtitle: "{subtitle}",
				counter: "{counter}",
				markupDescription: "{markupDescription}"
			});

			var oModel = new JSONModel();

			oModel.setData(aMsg);

			var oBackButton = new Button({
				icon: sap.ui.core.IconPool.getIconURI("nav-back"),
				visible: false,
				press: function () {
					that.oMessageView.navigateBack();
					this.setVisible(false);
				}
			});

			this.oMessageView = new MessageView({
				showDetailsPageHeader: false,
				itemSelect: function () {
					oBackButton.setVisible(true);
				},
				items: {
					path: "/",
					template: oMessageTemplate
				}
			});

			this.oMessageView.setModel(oModel);

			this.oDialog = new Dialog({
				resizable: true,
				content: this.oMessageView,
				state: "Error",
				beginButton: new Button({
					press: function () {
						that._bMessageOpen = false;
						this.getParent().close();
					},
					text: "Close"
				}),
				customHeader: new Bar({
					contentMiddle: [
						new Text({
							text: "Error"
						})
					],
					contentLeft: [oBackButton]
				}),
				contentHeight: "300px",
				contentWidth: "500px",
				verticalScrolling: false
			});

			this.oMessageView.navigateBack();
			this.oDialog.open();
		}
	});
});