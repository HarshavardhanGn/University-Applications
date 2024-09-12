sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('businesshiringui.ext.controller.Univ_hiring_list', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf businesshiringui.ext.controller.Univ_hiring_list
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			

			routing : {

				
				onBeforeBinding: async function ()
				{

					

					var e1,oUserInfoService, oUserEmail;
					

					

					var oModel = this.base.getExtensionAPI().getModel();

					
					


	
		   

					if (!oModel) {
						console.error('Model is not available.');
						return;
					}

					var sServiceUrl;
				
				if (typeof oModel.getServiceUrl === "function") {
				   
					sServiceUrl = oModel.getServiceUrl(); 
					
					console.log('Service URL:', sServiceUrl);
				   
				} 
    
			   
				

				const oView = this.base.getView();
                
                const buttons = oView.findAggregatedObjects(true, function (control) {
                    return control.isA("sap.m.Button") && (control.getId().includes("Create") || control.getId().includes("Delete"));
                });
                
                const createButton = buttons[0];
                const deleteButton= buttons[1];
                const create = buttons[2];
                const del = buttons[3];
                const c = buttons[4];
                const d = buttons[5];

				create.setVisible(false);
				del.setVisible(false);
				c.setVisible(false);
				d.setVisible(false);
                
				
				
				
				try {
					const auth_i = await new Promise((resolve, reject) => {
						jQuery.ajax({
				   
							url: sServiceUrl + "/Authority", 
							method: "GET",
							dataType: "json",
							success: function (data) {
								resolve(data);
							},
							error: function (jqXHR, textStatus, errorThrown) {
								reject(new Error(textStatus + ': ' + errorThrown));
							}
						});
					});

					const auth_value = auth_i.value;
                   
					for (let rec of auth_value) {
						if (rec.user === 'Admin' ) {
						  e1 = rec.email;  //get email id
						  console.log(e1);
						}
					}
                     
					if (sap.ushell && sap.ushell.Container) {
						 oUserInfoService = sap.ushell.Container.getService("UserInfo");
						 oUserEmail = oUserInfoService.getEmail();
						// oUserEmail = 'gnharsha.13@gmail.com';
						 if(oUserEmail !== e1)
							{
								this.getView().findAggregatedObjects(true, function (control) {
									return control.isA("sap.m.Button");
								}).forEach(function (oButton) {
									
									if (oButton.getId().includes("Create") || oButton.getId().includes("Delete")) {
										oButton.setVisible(false);
										// oButton.setEnable(false); 
									}
								});
								
								this.base.getView().findAggregatedObjects(true, function (control) {
									return control.isA("sap.m.Button") && (control.getId().includes("Draft") || control.getId().includes("Save"));
								}).forEach(function (oButton) {
									oButton.setVisible(false); // Hide draft-related buttons
								});
								

					   this.base.getView().findAggregatedObjects(true, function (control) {
						   return control.isA("sap.m.Input") && control.getId().includes("Draft");
					   }).forEach(function (oInput) {
						   oInput.setEditable(false);
						   oInput.setEnabled(false);
							// Set draft-related fields to read-only
					   });
					 
					   // Set "Editing Status" to "All" (Hiding Draft)
					   this.base.getView().findAggregatedObjects(true, function (control) {
						   return control.isA("sap.m.Select") && control.getId().includes("EditingStatus");
					   }).forEach(function (oSelect) {
						   oSelect.setSelectedKey("All (Hiding Draft)"); 
						   oSelect.setEnabled(false); 
					   });
					  
							}
					}
					else{
						console.error("UserInfo service not available.");
					}
				}
				catch (error)
				{
					console.error('Error fetching Authority data', error);
				}}
			}
		}
	});
});

			
