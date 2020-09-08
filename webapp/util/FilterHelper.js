sap.ui.define([
	"sap/ui/model/FilterOperator"
], function (FilterOperator) {
	"use strict";

	return {
		/** 
		 * Handles the live change events of the filters and pushes the filtervalues in the filter array
		 * @param controller - Main Controller context
		 * @param oEvent - New filter value
		 */
		onLiveChangeFilter: function (oController, oEvent) {
			var aFilters = [];
			
			var sFilterCountry = oController.byId("filterCountry").getSelectedKey();
			var sFilterCity = oController.byId("filterCity").getValue();
			
			if (sFilterCountry){
				aFilters.push(new sap.ui.model.Filter("Country", FilterOperator.EQ, sFilterCountry));
			}
			
			if (sFilterCity){
				aFilters.push(new sap.ui.model.Filter("City", FilterOperator.Contains, sFilterCity));
			}

			this.filterTable(oController, aFilters);
		},
		/** 
		 * Filters the table with all filters
		 * @param controller
		 */
		filterTable: function (oController, aFilters) {
			
			oController.byId("idCustomersTable").getBinding("items").filter(aFilters);
		}
	};
});