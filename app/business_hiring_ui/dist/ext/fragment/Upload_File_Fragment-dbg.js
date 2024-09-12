sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';
    var iddd;
    var that = this;
    var extractedNumber;
    var extractedid;

    return {
        onAfterItemAdded: function (oEvent) {
            debugger;
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            var item = oEvent.getParameter("item");
            var par_id = window.location.href;
            // const regex1 =  /lectId='([^']*)'/;
            const regex = /cdum=([a-fA-F0-9-]+)/;;
            const match = par_id.match(regex);
            if (match) {
                extractedNumber = match[1];
                console.log(extractedNumber); // Output: 1
            } else {
                console.log("Number not found in URL");
            }
            // const match1 = par_id.match(regex1);
            // if (match1) {
            //     extractedid = match1[1];
            //     console.log(extractedid); // Output: 1
            // } else {
            //     console.log("id not found in URL");
            // }


            var _createEntity = async function (item) {
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName(),
                    size: item.getFileObject().size,
                    cdum: extractedNumber,
                    // lectId : extractedid
                };
                debugger

                var settings = {
                    url: baseUrl + `College(cdum=${extractedNumber},IsActiveEntity=false)/ClgToFile`,
                    // url: `odata/v4/my/lectures(lUuid=${extractedNumber},IsActiveEntity=false)/lectofile`,
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                };

                await new Promise((resolve, reject) => {
                    debugger
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            debugger
                            iddd = results.ID;
                            resolve(results);
                        })
                        .fail((err) => {
                            reject(err);
                        });
                });
            };

            _createEntity(item)
                .then((ID) => {
                    debugger
                    var url = baseUrl + `Files(ID=${iddd},IsActiveEntity=false)/content`;
                    iddd = null;
                    item.setUploadUrl(url);
                    item.setUrl(url)
                    var oUploadSet = this.byId("uploadSet");
                    oUploadSet.setHttpRequestMethod("PUT");
                    oUploadSet.uploadItem(item);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onOpenPressed: function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            var curr = oEvent.oSource.mProperties.url;
            if(!curr.startsWith(baseUrl)){
            let fileurl = baseUrl + oEvent.oSource.mProperties.url.substring(1);
            // let fileurl = oEvent.oSource.mProperties.url;
            oEvent.oSource.mProperties.url = fileurl;
            }

            // oEvent.oSource.setUploadUrl(fileurl)
        },

        onUploadCompleted: function (oEvent) {
            debugger
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
        },
        onBeforeItemRemoved: function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl()
            debugger
            const regex = /^(.*?),IsActiveEntity=/;

            let match = oEvent.mParameters.item.mProperties.url.match(regex);
            let urll = match[1] + ",IsActiveEntity=false)";
            $.ajax({
                url: baseUrl + urll,
                method: "DELETE"

            })
        },


        //formatters
        formatThumbnailUrl: function (mediaType) {
            debugger
            var iconUrl;
            switch (mediaType) {
                case "image/png":
                    iconUrl = "sap-icon://card";
                    break;
                case "text/plain":
                    iconUrl = "sap-icon://document-text";
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    iconUrl = "sap-icon://excel-attachment";
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    iconUrl = "sap-icon://doc-attachment";
                    break;
                case "application/pdf":
                    iconUrl = "sap-icon://pdf-attachment";
                    break;
                default:
                    iconUrl = "sap-icon://attachment";
            }
            return iconUrl;
        }

    };
});
