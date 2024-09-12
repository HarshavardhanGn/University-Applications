sap.ui.define(['sap/ui/core/mvc/ControllerExtension',"sap/ui/model/Filter","sap/ui/model/FilterOperator"], function (ControllerExtension,Filter,FilterOperator) {
	'use strict';

	return ControllerExtension.extend('depthiringapp.ext.controller.List_dept', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf depthiringapp.ext.controller.List_dept
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing : { 
			
			onBeforeBinding: async function () {
				debugger
			   var oUserEmail;
			   var oUserInfoService ;
			   var e1,e2,e3;

       	
			
			   debugger
			   if (sap.ushell && sap.ushell.Container) {
					oUserInfoService = sap.ushell.Container.getService("UserInfo");
					oUserEmail = oUserInfoService.getEmail(); 
				    // alert(oUserEmail);
				  }
				  else{
				   console.log('not got ');
				  }
				
			   var oModel = this.base.getExtensionAPI().getModel();
		   

				if (!oModel) {
					console.error('Model is not available.');
					return;
				}

				


				

				var sServiceUrl;
				
				if (typeof oModel.getServiceUrl === "function") {
				   
					sServiceUrl = oModel.getServiceUrl(); 
					
					console.log('Service URL:', sServiceUrl);
				   
				} else {
				   
					console.error('Unable to determine the service URL.');
					return;
				   
				}

			   
				debugger
				this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.setFilterConditions({
					"$editState": [
						{
							"operator": "DRAFT_EDIT_STATE",
							"values": [
								"ALL_HIDING_DRAFTS",
								"All (Hiding Drafts)"
							],
							"validated": "Validated"
						}
					]
				});
				
				
				try {
					const response1 = await new Promise((resolve, reject) => {
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

					console.log('Fetched the Authority data',response1);
					const Auth_info = response1.value;
				
				   debugger




					

		   
			   
				debugger
			   for (let record of Auth_info) {
				   if (record.user === 'Admin' ) {
					 e1 = record.email;  //get email id
					 console.log(e1);
					 
				}
				debugger
				if(record.email === oUserEmail) 
				   {
					   e2 = record.user;  //get deptid
				   }
			   }


			   
			   debugger
			   if (sap.ushell && sap.ushell.Container) {
				   var oUserInfoService = sap.ushell.Container.getService("UserInfo");
				   var oUserEmail = oUserInfoService.getEmail(); // This should return the user's email
				 debugger
			   
				   if (oUserEmail !== e1) {
					   debugger
					   this.getView().findAggregatedObjects(true, function (control) {
						   return control.isA("sap.m.Button");
					   }).forEach(function (oButton) {
						   debugger
						   if (oButton.getId().includes("Create") || oButton.getId().includes("Delete")) {
							   oButton.setVisible(false);
							   // oButton.setEnable(false); 
						   }
					   });
					   debugger
					   this.base.getView().findAggregatedObjects(true, function (control) {
						   return control.isA("sap.m.Button") && (control.getId().includes("Draft") || control.getId().includes("Save"));
					   }).forEach(function (oButton) {
						   oButton.setVisible(false); // Hide draft-related buttons
					   });
					   debugger

					   this.base.getView().findAggregatedObjects(true, function (control) {
						   return control.isA("sap.m.Input") && control.getId().includes("Draft");
					   }).forEach(function (oInput) {
						   oInput.setEditable(false);
						   oInput.setEnabled(false);
							// Set draft-related fields to read-only
					   });
					   debugger
					   // Set "Editing Status" to "All" (Hiding Draft)
					   this.base.getView().findAggregatedObjects(true, function (control) {
						   return control.isA("sap.m.Select") && control.getId().includes("EditingStatus");
					   }).forEach(function (oSelect) {
						   oSelect.setSelectedKey("All (Hiding Draft)"); 
						   oSelect.setEnabled(false); 
					   });
					   debugger
				// 	   var oFilterBar = sap.ui.getCore().byId(filterId);

				//    var oFilterConditions = {
				// 	   "$editState": [ 
				// 		   {
				// 			   "operator": "DRAFT_EDIT_STATE",
				// 			   "values": [
				// 				   "ALL_HIDING_DRAFTS",
				// 				   "All (Hiding Drafts)"
				// 			   ],
				// 			   "validated": "Validated"
				// 		   }
				// 	   ]
				//    };
				//    oFilterBar.setFilterConditions(oFilterConditions);

					   
					   


					   
				   }
				   
			   }else {
				   console.error("UserInfo service not available.");
			   }
			
			   
		   }
				catch (error) {
					console.error('Error fetching Authority data', error);
				}


			   }
			}
		   }
		   
	   });
   });
			   
   
   
