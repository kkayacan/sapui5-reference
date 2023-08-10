this._eventId = jQuery.sap.getUriParameters().get("eventid");
this._pernr = jQuery.sap.getUriParameters().get("pernr");
this._type = jQuery.sap.getUriParameters().get("type");

// OR

this._appType = window.location.href.substr(window.location.href.indexOf("fapp") + 5, 1);