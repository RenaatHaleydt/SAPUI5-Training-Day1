sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageToast, MessageBox, JSONModel,  Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.amista.Day1.controller.App", {
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("NorthwindModel");
			this.getView().setModel(oModel, "northwindModel");

			var oData = {
				"name": "",
				"surname": "",
				"age": null
			};

			var oJSONModel = new JSONModel(oData);
			this.getView().setModel(oJSONModel, "SimpleFormModel");
		},
		handleMessageToastPress: function (oEvent) {
			var that = this;
			var msg = this.getResourceBundle().getText("messageToastExample");
			sap.m.MessageBox.confirm(this.getResourceBundle().getText("confirmQuestion"), {
				actions: [sap.m.MessageBox.Action.OK,
					sap.m.MessageBox.Action.Cancel
				],
				emphasizedAction: sap.m.MessageBox.Action.OK,
				onClose: function (oAction) {
					if (oAction == "OK") {
						that.showMessageToast(msg);
					}
				}
			});
			var oButton = oEvent.getSource();
			oButton.setText(this.getResourceBundle().getText("differentText"));
			oButton.setType("Accept");
		},
		showMessageToast: function (sMessage) {
			sap.m.MessageToast.show(sMessage);
		},
		onItemClicked: function (oEvent) {
			var oObject = this.getOwnerComponent().getModel("NorthwindModel").getProperty(
				oEvent.getSource().getBindingContextPath() // "/Customer('AFKI')"
			);
			this.showMessageToast("The country = " + oObject.Country);
		},
		onSavePressed: function(oEvent){
			var oSimpleFormData = this.getView().getModel("SimpleFormModel").getData();
			var sMessage = this.getResourceBundle().getText("greetingMessageName", [oSimpleFormData.name]);
			this.showMessageToast(sMessage);
		},
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		onSearchList: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("FirstName", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("idList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters);
		},

	});
});