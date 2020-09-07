sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.amista.Day1.controller.App", {
		onInit: function () {
			// this = the current environment
			var that = this;
			
			// path to find the model we declared in directory model
			var sRootPath = jQuery.sap.getModulePath("com.amista.Day1"); // Used to load the models that are predefined in the application
			
			// Loading our RandomModel
			var oRandomModel = new sap.ui.model.json.JSONModel([sRootPath, "model/RandomModel.json"].join("/"));
			
			// event when the RandomModel is fully loaded
			oRandomModel.attachRequestCompleted(function () {
				// We bind the RandomModel to the View of this controller (the App.view.xml) and call it randomJSONModel
				that.getView().setModel(oRandomModel, "randomJSONModel");
			});
			
			// This is another way to define a JSONModel and bind it to the view
			this.getView().setModel(new sap.ui.model.json.JSONModel({}), "errorModel");
		},
		onPressSayHelloButton: function(oEvent){
			var sMessage = "Good afternoon " + "Renaat";
			sap.m.MessageToast.show(sMessage);
		}
	});
});