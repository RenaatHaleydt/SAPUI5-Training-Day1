/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/m/MessageBox"
], function (MessageBox) {
	"use strict";

	var bErrors = false;
	return {
		validateFieldsForSave: function (oFormData) {
			bErrors = false;
			
			if(oFormData.surname === ""){
				bErrors = true;
			}
			
			return bErrors;
		}
	};
});