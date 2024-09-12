sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('depthiringapp.ext.controller.Department_hiring_list', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf depthiringapp.ext.controller.Department_hiring_list
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				debugger
			},
			routing : { 
				onBeforeBinding: async function () {
					var oUserEmail;
					var oUserInfoService ;
	                 debugger
					if (sap.ushell && sap.ushell.Container) {
						 oUserInfoService = sap.ushell.Container.getService("UserInfo");
						 oUserEmail = oUserInfoService.getEmail();
	                  debugger
						
						 
					   }
					   else{
						console.log('not got ');
					   }
					 
					var oModel = this.base.getExtensionAPI().getModel();
					debugger
	
					if (!oModel) {
						console.error('Model is not available.');
						return;
					}
					debugger
	
					var sServiceUrl;
					debugger
					if (typeof oModel.getServiceUrl === "function") {
					   debugger
						sServiceUrl = oModel.getServiceUrl(); 
						debugger
						console.log('Service URL:', sServiceUrl);
						debugger
					} else {
					   debugger
						console.error('Unable to determine the service URL.');
						return;
						debugger
					}
	
					var e1,e2;
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
						debugger
	
				   console.log('Fetched the Authority data',response1);
				   const Auth_info = response1.value;
				   debugger
				  
	
	
				
				debugger
				   for (let record of Auth_info) {
					   if (record.email === oUserEmail) {
						 e1 = record.user;
						 
						  }
						  if(record.user === 'Admin')
							{
								e2 = record.email;
							}
				   }
				  debugger
				   const sUrl = window.location.href;
					console.log("Current URL:", sUrl);
					debugger
					const urlObj = new URL(sUrl);
					const hashSegment = urlObj.hash.substring(1); 
					debugger
					const match = /\/Department\(deptId='([^']*)'/.exec(hashSegment);
					debugger
					const d_id = match ? match[1] : null;
	
					
					
					
					
					
					if(oUserEmail !== e2){ 
	
					if(d_id !== e1 ){
						   debugger
						   this.getView().findAggregatedObjects(true, function (control) {
							return control.isA("sap.m.Button");
						}).forEach(function (oButton) {
							if (oButton.getId().includes("Delete")) {
								oButton.setVisible(false);
							}
							else if (oButton.getId().includes("Edit")){
								oButton.setEnabled(false);
							}
						});
					
				}
				else 
				{
					debugger
					this.getView().findAggregatedObjects(true, function (control) {
						return control.isA("sap.m.Button");
					}).forEach(function (oButton) {
						if (oButton.getId().includes("Delete")) {
							oButton.setVisible(true);
						}
						else if (oButton.getId().includes("Edit")){
							oButton.setEnabled(true);
						}
					});
				}
			}
	
			
	debugger
				  
				   
					   
				   
				   
					} catch (error) {
						console.error('Error fetching Authority data', error);
					}
	
			 } 
			}
				
			}
		});
	});
	   
	
		
