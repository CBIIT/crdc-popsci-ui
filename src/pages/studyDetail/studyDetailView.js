import React from 'react';
import {
  withStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import Snackbar from '../../components/Snackbar';
// import Stats from '../../components/Stats/AllStatsController';
import Tab from '../../components/Tab/Tab';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import { headerIcon } from '../../bento/studyDetailData';
import Styles from './studyDetailsStyle';
import StudyThemeProvider from './studyDetailsThemeConfig';
import {
  Overview,
  Demographics,
  Publications,
  Neoplasms,
  StudyFiles,
  Country,
  DataCollection,
} from './views';
import TabContentWrapper from './TabContentWrapper';
import StatsView from '../../components/Stats/StatsView';

const StudyDetailView = ({ classes, data, isLoading=false, isError=false, studyShortName}) => {
  const [snackbarState, setsnackbarState] = React.useState({ open: false, value: 0 });
  const [currentTab, setCurrentTab] = React.useState(2);

  /*
    Notification i.e. XXX files are added to cart. Might be used for Study Files tab
   * const openSnack = (value) => setsnackbarState({ open: true, value, action: 'added' });
  */
  const closeSnack = () => setsnackbarState({ open: false });
  const handleTabChange = (event, value) => setCurrentTab(value);

  const getHeaderIcon = () => (
    <img src={headerIcon} alt="Study detail header icon" width={81} height={81} />
  );

  const studyGeneral = {...data?.studyGeneral?.at(0), ...data?.tabStudy?.at(0), ...data?.globalStatsBar?.at(0)};

  const statsbarData = {
    ...data.searchStudies,
    number_of_participants: studyGeneral.number_of_participants,
  }

  const breadCrumbJson = [
    { name: 'Explore', to: '/explore', isALink: true },
    { name: studyGeneral.study_short_name, to: '', isALink: false },
  ];

  const processedTabs = [
    { index: 0, label: 'Overview', content: <Overview data={studyGeneral || {}}  />},
    { index: 1, label: 'Neoplasms', content: <Neoplasms data={studyGeneral || {}} /> },
    { index: 2, label: 'Demographics', content: <Demographics data={studyGeneral || {}} studyShortName={studyShortName} /> },
    { index: 3, label: 'Data Collected' ,content: <DataCollection data={data?.dataCollectionPage[0].data_collection || {}} /> },
    { index: 4, label: 'Countries and States',content: <Country data={studyGeneral || {}} /> },
    { index: 5, label: 'Publications', content: <Publications data={studyGeneral || {}} /> },
    { index: 6, label: 'Study Files', content: <StudyFiles data={studyGeneral || {}} />},
  ];

  if (isLoading) return <CircularProgress />;

  if (isError) {
    return (
      <Typography variant="h5" color="error" size="sm">
        An error has occurred in Population Sciences API
      </Typography>
    );
  }


  let number_of_participants = 0;

  if (studyGeneral && studyGeneral.number_of_participants) {
    const parsedNumber = parseInt(studyGeneral.number_of_participants, 10);
    if (!isNaN(parsedNumber)) {
      number_of_participants = parsedNumber.toLocaleString();
    }
  }

  return (
    <StudyThemeProvider>
      <Snackbar
        snackbarState={snackbarState}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        // classes={classes}
      />

      {/* <Stats /> */ }
      <StatsView data={statsbarData} />

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
                <span className={classes.headerStudyShortName}>
                   {studyGeneral.study_short_name }
                </span>
              </span>
            </div>

            <div className={classes.headerStudyName}>
              <span style={{verticalAlign: 'bottom'}}>
                {studyGeneral.study_name}
              </span>
            </div>
          </div>

          <div className={classes.numOfparticipants}>
            <span className={classes.numOfparticipantsText}>
              Participants in this Study&nbsp;:&nbsp;&nbsp;
            </span>
            <span className={classes.numOfparticipantsCount}>
              { number_of_participants }
            </span>
          </div>
        </div> 
     
        <div className={classes.tabContainer}>
          <Tab
            styleClasses={classes}
            tabItems={processedTabs}
            currentTab={currentTab}
            handleTabChange={handleTabChange}
            id="overview"
          />
        </div>

        <hr className={classes.hrLine} />

        {processedTabs.map((processedTab, index) => (
          <TabContentWrapper value={currentTab} index={index} key={index}>
            {processedTab.content}
          </TabContentWrapper>
        ))}
      </div>
    </StudyThemeProvider>
  );
};

export default withStyles(Styles, { withTheme: true })(StudyDetailView);
