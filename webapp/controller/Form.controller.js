sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, JSONModel,MessageToast, MessageBox) {
   "use strict";
   return Controller.extend("com.amista.Day1.controller.Form", {
   		onInit: function(){
   			var oData = {
				"name": "",
				"surname": "",
				"age": null
			};

			var oJSONModel = new JSONModel(oData);
			this.getView().setModel(oJSONModel, "SimpleFormModel");
   		},
    	onSavePressed: function(oEvent){
			var oSimpleFormData = this.getView().getModel("SimpleFormModel").getData();
			var sMessage = this.getResourceBundle().getText("greetingMessageName", [oSimpleFormData.name]);
			this.showMessageToast(sMessage);
		},
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		showMessageToast: function (sMessage) {
			sap.m.MessageToast.show(sMessage);
		}
   });
});