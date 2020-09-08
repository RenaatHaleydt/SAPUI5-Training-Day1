sap.ui.define([],
	function () {
		"use strict";
		
		return {
			getData: function (sUrl) {
				var that = this;
				return new Promise(function (resolve, reject) {
					var oJSONModel = new sap.ui.model.json.JSONModel();

					oJSONModel.loadData(sUrl);
					oJSONModel.attachRequestCompleted(function (oEvent) {
						if (oEvent.getParameter("success")) {
							resolve(this.getData());
						} else {
							reject("Not good!");//display error message with error in it
						}
					});
				});
			},
		};

	});