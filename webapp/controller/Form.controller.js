sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"com/amista/Day1/util/ValidatorHelper"
], function (Controller, JSONModel, MessageToast, MessageBox, ValidatorHelper) {
	"use strict";
	return Controller.extend("com.amista.Day1.controller.Form", {
		onInit: function () {
			var oData = {
				"name": "",
				"surname": "",
				"age": null
			};

			var oJSONModel = new JSONModel(oData);
			this.getView().setModel(oJSONModel, "SimpleFormModel");
		},
		onSavePressed: function (oEvent) {
			var oSimpleFormData = this.getView().getModel("SimpleFormModel").getData();

			var bErrorsBeforeSaving = ValidatorHelper.validateFieldsForSave(oSimpleFormData); // true when errors, false when no errors

			if (bErrorsBeforeSaving) {
				sap.m.MessageBox.error(this.getResourceBundle().getText("errorMessage"));
				return;
			} else {
				var sMessage = this.getResourceBundle().getText("greetingMessageName", [oSimpleFormData.name]);
				this.showMessageToast(sMessage);
			}

		},
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		showMessageToast: function (sMessage) {
			sap.m.MessageToast.show(sMessage);
		}
	});
});