sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'depthiringapp/test/integration/FirstJourney',
		'depthiringapp/test/integration/pages/DepartmentList',
		'depthiringapp/test/integration/pages/DepartmentObjectPage'
    ],
    function(JourneyRunner, opaJourney, DepartmentList, DepartmentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('depthiringapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDepartmentList: DepartmentList,
					onTheDepartmentObjectPage: DepartmentObjectPage
                }
            },
            opaJourney.run
        );
    }
);