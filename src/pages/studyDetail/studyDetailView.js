import React from 'react';
import {
  Grid,
  withStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { clearAllFilters } from '@bento-core/facet-filter';

import Snackbar from '../../components/Snackbar';
import Stats from '../../components/Stats/AllStatsController';
import {
  headerIcon,
  tab,
} from '../../bento/studyDetailData';
import Tab from '../../components/Tab/Tab';
import TabPanel from '../../components/Tab/TabPanel';
import Styles from './studyDetailsStyle';
import StudyThemeProvider from './studyDetailsThemeConfig';
import Overview from './views/overview/overview';
import store from '../../store';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';


const StudyDetailView = ({ classes, data, isLoading=false, isError=false}) => {
  // const studyData = data;

  const studyData = {
    studyByStudyShortName: [
      {
        study_short_name: 'PLCO',
        study_id: 'NCT01696968',
        study_name: 'The Prostate, Lung, Colorectal, and Ovarian Cancer Screening Trial',
        participant_count: 5000,
      }
    ]
  };
  
  const processedTabs = tab.items;

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });

  function closeSnack() {
    setsnackbarState({ open: false });
  }

  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const getHeaderIcon = () => (
    <img
      src={headerIcon}
      alt="Study detail header icon"
      width={81}
      height={81}
    />
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography variant="h5" color="error" size="sm">
        An error has occurred in interoperability api
      </Typography>
    );
  }

  const linkToDashboard = () => {
    // TODO: Once local-find is enabled; dispatch(resetAllData()) from bento-core/local-find to RESET_LOCALFIND_ALL_DATA
    store.dispatch(clearAllFilters());
  };
  const breadCrumbJson = [{
    name: 'Studies',
    to: '/explore',
    isALink: true,
  }, {
    name: "NCT01696968",
    to: '',
    isALink: false,
  }];

  return (
    <StudyThemeProvider>
      <Snackbar
        snackbarState={snackbarState}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        classes={classes}
      />

      <Stats />
      <div className={classes.container}>
        <div className={classes.breadCrumb}>
          <CustomBreadcrumb separator=">" data={breadCrumbJson} />
        </div>
        <div className={classes.header}>
          <div className={classes.logo}>
            { getHeaderIcon() }
          </div>
          <div className={classes.headerTitle}>

            <div className={classes.headerMainTitle}>
              <span>
                
                Study:
                <span className={classes.headerMainSubTitle}>
                   {studyData.studyByStudyShortName[0].study_short_name }
                </span>
              </span>
            </div>
            <div className={classes.headerSubTitleCate}>
              <span style={{verticalAlign: 'bottom'}}>
                {studyData.studyByStudyShortName[0].study_name}
              </span>
            </div>
          </div>
          <div className={classes.numOfparticipants}>
            <span className={classes.numOfparticipantsText}>Participants in this Study&nbsp;:&nbsp;&nbsp;</span>
              <span className={classes.numOfparticipantsCount}>
                { studyData.studyByStudyShortName[0].participant_count || 0}
              </span>
          </div>
        </div>

     
        <div className={classes.detailContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Tab
                styleClasses={classes}
                tabItems={processedTabs}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
                id="overview"
              />
            </Grid>
          </Grid>
        </div>
      
        {
          processedTabs.map((processedTab, index) => {
            switch (processedTab.label) {
              // case 'OVERVIEW': return (
              //   <TabPanel value={currentTab} index={index}>
              //     <Overview data={data} />
              //   </TabPanel>
              // );

              // case 'ADDITIONAL DETAILS': return (
              //   <TabPanel value={currentTab} index={index}>
              //     <p>ADDITIONAL DETAILS</p>
              //   </TabPanel>
              // );
            
              default:
                return (
                  <TabPanel value={currentTab} index={index}>
                    
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      style={{height: '400px'}}
                    >
                    <p style={{margin: 'auto'}}>Under construction ... </p>
                    </Grid>
                  </TabPanel>
                )
            }
          })
        }
      </div>
    </StudyThemeProvider>
  );
};

export default withStyles(Styles, { withTheme: true })(StudyDetailView);
