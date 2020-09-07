sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.amista.Day1.controller.App", {
		onInit: function () {
		},
		onPressSayHelloButton: function(oEvent){
			var sMessage = "Good afternoon " + "Renaat";
			sap.m.MessageToast.show(sMessage);
		}
	});
});