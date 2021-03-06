sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../model/formatter",
	"sap/ui/model/Sorter",
	"../util/AjaxHelper",
	"com/amista/Day1/util/FilterHelper",
], function (Controller, MessageToast, MessageBox, JSONModel, Filter, FilterOperator, formatter, Sorter, AjaxHelper, FilterHelper) {
	"use strict";

	return Controller.extend("com.amista.Day1.controller.App", {
		//Store the loaded formatter in a local property so it can be loaded in the view
		formatter: formatter,
		onInit: function () {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("NorthwindModel");
			this.getView().setModel(oModel, "northwindModel");

			var aCountries = {
				"Countries": [{
					"name": "USA",
					"active": true
				}, {
					"name": "Belgium",
					"active": false
				}, {
					"name": "Italy",
					"active": false
				}, {
					"name": "Germany",
					"active": true
				}, {
					"name": "UK",
					"active": true
				}]
			};

			var oJSONModel = new JSONModel(aCountries);
			this.getView().setModel(oJSONModel, "CountryModel");
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
		onPressSortCustomers: function (oEvent) {
			if (!this._oCustomerSortDialog) {
				this._oCustomerSortDialog = sap.ui.xmlfragment("com.amista.Day1.view.fragment.CustomerSorter", this);
				this.getView().addDependent(this._oCustomerSortDialog);
			}
			this._oCustomerSortDialog.open();
		},
		onCustomerSortConfirmPressed: function (oEvent) {
			var oBinding = this.byId("idCustomersTable").getBinding("items");
			var sSortKey = oEvent.getParameter("sortItem").getKey();
			var bSortDescending = oEvent.getParameter("sortDescending");
			oBinding.sort(new Sorter(sSortKey, bSortDescending));
		},
		showCovidCasesUSAToday: function (oEvent) {
			var that = this;
			AjaxHelper.getData("/CovidAPI/v1/us/current.json").then(function (oData) {
				that.showMessageToast("Positive cases today in USA:\n " + oData[0].positive);
			}).catch(function (oError) {

			});
		},
		onLiveChangeFilter: function (oEvent) {
			FilterHelper.onLiveChangeFilter(this, oEvent);
		},

	});
});