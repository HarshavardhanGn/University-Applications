sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension,Filter,FilterOperator) {
	'use strict';

	return ControllerExtension.extend('businesshiringui.ext.controller.Object_of_Univ', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf businesshiringui.ext.controller.Object_of_Univ
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			
			routing :
			{
				onBeforeBinding: async function () {
                    
					  var e1,oUserEmail,oUserInfoService,e2;


					

					  var oModel = this.base.getExtensionAPI().getModel();
					  var dobValue;

					
					  
					if (!oModel) {
						console.error('Model is not available.');
						return;
					}
                

					

				
	debugger
					
	const sUrl = window.location.href;
	console.log("Current URL:", sUrl);
	
	// Create a URL object to parse the URL
	const urlObj = new URL(sUrl);
	debugger
	// Extract the hash segment from the URL
	const hashSegment = urlObj.hash.substring(1); 
	
	// Regular expression to match and capture the cdum UUID in the hash segment
	const uuidRegex = /\/College\(lectId='[^']*',cdum=([a-fA-F0-9\-]+),IsActiveEntity=[^)]*\)/;
	
	// Apply the regular expression to the hash segment
	const match = uuidRegex.exec(hashSegment);
	
	// Extract the UUID value if there is a match
	const cdumValue = match ? match[1] : null;
	debugger
	console.log("Extracted cdum value (UUID):", cdumValue);
	






                 try{ 
				const clg_f = await new Promise((resolve, reject) => {
					jQuery.ajax({
			   
						url: sServiceUrl + "/College", 
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
				
          const clg_i1 = clg_f.value;
		  var st;
				for(let i of clg_i1)
					{
						if(i.cdum === cdumValue)
							{    debugger
								st=i.Status;
							}
							
					}



				
                    debugger
					if(st === 'In Process' || st === 'Rejected'  ){
						// debugger
						
						var aButtons = this.getView().findAggregatedObjects(true, function (control) {
							return control.isA('sap.m.Button') && (control.getId().includes('Edit') || control.getId().includes('Delete'));
						  });
						  aButtons.forEach(function (oButton) {
							oButton.setEnabled(false);
							oButton.setVisible(false); 
						  });
				 
			 }
			 else if(st !== 'Approved')
			 {
				  debugger
				var aButtons = this.getView().findAggregatedObjects(true, function (control) {
					return control.isA('sap.m.Button') && (control.getId().includes('Edit') || control.getId().includes('Delete'));
				  });
				  aButtons.forEach(function (oButton) {
					oButton.setEnabled(false);
					oButton.setVisible(false); 
				  });
			 }
			}
			catch (error)
		{
         console.error('Can not fetch data');
		}

					var oUIModel = this.getView().getModel("ui");
					// debugger
					var bIsEditMode = oUIModel.oData.editMode;
					var oUploadSet = this.base.getView().byId("businesshiringui::CollegeObjectPage--fe::CustomSubSection::Upload_File_Fragment--uploadSet");
					var oBindingInfo = oUploadSet.getBindingInfo("items");
					var oTemplate = oBindingInfo.template;
				

					if(bIsEditMode == 'Editable') {
					 oUploadSet.setUploadButtonInvisible(false);
					 oTemplate.setVisibleRemove(true);
					 oTemplate.setVisibleEdit(true);
					 oTemplate.setEnabledEdit(true);
					 oUploadSet.setUploadEnabled(true);
				 } else {
					 oUploadSet.setUploadButtonInvisible(true);
					 oTemplate.setVisibleRemove(false);
					 oTemplate.setVisibleEdit(false);
					 oUploadSet.setUploadEnabled(false);
				 }


				 
			


					var sServiceUrl;
				
				if (typeof oModel.getServiceUrl === "function") {
				   
					sServiceUrl = oModel.getServiceUrl(); 
					
					console.log('Service URL:', sServiceUrl);
				   
				}

				
	
                
				
	
			
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
						if(oUserEmail !== e1)
						   {  

				
					this.getView().findAggregatedObjects(true, function (control) {
					 return control.isA("sap.m.Button");
				 }).forEach(function (oButton) {
					 if (oButton.getId().includes("Delete")) {
						 oButton.setVisible(false);
					 }
					 else if (oButton.getId().includes("Edit")){
						 oButton.setEnabled(false);
					 }
					});}}
		}
		catch (error)
		{
         console.error('Can not fetch auth data');
		}

		this.adjustUIControls();}}},

		adjustUIControls: function () {
			var that = this;
					 
				var create = that.base.getView().findAggregatedObjects(true, function (control) {
					return control.isA("sap.m.Button") && control.getId().includes("Save");
				});
				// debugger
				var createButton = create[0];
				setTimeout(function() {
					if (createButton.getText().includes("Create")) {
						// debugger
						createButton.setText("Send for Approval");
					}
			}.bind(this), 1000); 
		}
		
			
			
		


		

		
	

	});
});
