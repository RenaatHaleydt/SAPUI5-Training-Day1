sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
], function (Controller, MessageToast, MessageBox, JSONModel) {
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
			var msg = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\r\n eirmod.';
			sap.m.MessageBox.confirm("Do you want to display the message toast?", {
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
			oButton.setText("Press me again");
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
			var sMessage = "Hello " + oSimpleFormData.name;
			this.showMessageToast(sMessage);
		}
	});
});