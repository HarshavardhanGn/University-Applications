sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'businesshiringui/test/integration/FirstJourney',
		'businesshiringui/test/integration/pages/CollegeList',
		'businesshiringui/test/integration/pages/CollegeObjectPage'
    ],
    function(JourneyRunner, opaJourney, CollegeList, CollegeObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('businesshiringui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCollegeList: CollegeList,
					onTheCollegeObjectPage: CollegeObjectPage
                }
            },
            opaJourney.run
        );
    }
);