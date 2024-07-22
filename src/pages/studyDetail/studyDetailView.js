import React from 'react';
import {
  withStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import Snackbar from '../../components/Snackbar';
import Stats from '../../components/Stats/AllStatsController';
import {
  headerIcon,
} from '../../bento/studyDetailData';
import Tab from '../../components/Tab/Tab';
import Styles from './studyDetailsStyle';
import StudyThemeProvider from './studyDetailsThemeConfig';
import Overview from './views/overview/overview';
import Demographics from  './views/demographics';
import Publications from './views/publications';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import TabContentWrapper from './TabContentWrapper';
import Neoplasms from './views/neoplasms';


const StudyDetailView = ({ classes, data, isLoading=false, isError=false}) => {

  const {
    study_name,
    study_short_name,
    study_description,
    study_type,
    study_design,
    enrollment_beginning_year,
    enrollment_ending_year,
    study_beginning_year,
    study_ending_year,
    biospecimen_collection,
    study_status,
    dbgap_accession_id,
    study_id,
    number_of_participants,

    primary_diagnosis_disease_term,
    primary_diagnosis_disease_count,

    associated_links,
    study_personnel,
    study_publication,
    
    // study_participant_maximum_age,
    // study_participant_median_age,
    // study_participant_minimum_age,
    // race,
    // ethnicity,
    // sex,
    // gender,

    // study_country,
    // number_of_countries,
    // study_state_province_territory,
    // number_of_states_provinces_territories,
    // primary_diagnosis_disease_term,
    // primary_diagnosis_disease_count,

    // study_publication, // [study_publication]
    // data_file, // [data_file]
  } = data?.studyGeneral[0]; 

  const studyHeader = {
    study_short_name,
    study_name,
    number_of_participants,
  }
  const overviewTabData = {
    study_description,
    study_type,
    study_design,
    enrollment_beginning_year, 
    enrollment_ending_year, 
    study_beginning_year, 
    study_ending_year, 
    biospecimen_collection, 
    study_status,
    dbgap_accession_id, 
    study_id,
    associated_links,
    study_personnel,
  };

  const neoplasmsTabData = {
    primary_diagnosis_disease_term,
    primary_diagnosis_disease_count,
  }
  
  const [snackbarState, setsnackbarState] = React.useState({ open: false, value: 0 });
  const [currentTab, setCurrentTab] = React.useState(0);

  /*
    Notification i.e. XXX files are added to cart. Might be used for Study Files tab
   * const openSnack = (value) => setsnackbarState({ open: true, value, action: 'added' });
  */
  const closeSnack = () => setsnackbarState({ open: false });
  const handleTabChange = (event, value) => setCurrentTab(value);

  const getHeaderIcon = () => (
    <img src={headerIcon} alt="Study detail header icon" width={81} height={81} />
  );

  const breadCrumbJson = [
    { name: 'Explore', to: '/explore', isALink: true },
    { name: studyHeader.study_short_name, to: '', isALink: false },
  ];

  const processedTabs = [
    { index: 0, label: 'Overview', content: <Overview data={overviewTabData} /> },
    { index: 1, label: 'Neoplasms', content: <Neoplasms data={neoplasmsTabData} /> },
    { index: 2, label: 'Demographics', content: <Demographics data={data} /> },
    { index: 3, label: 'Data Collected' },
    { index: 4, label: 'Countries and States' },
    { index: 5, label: 'Publications', content: <Publications data={study_publication} /> },
    { index: 6, label: 'Study Files' },
  ];

  if (isLoading) return <CircularProgress />;

  if (isError) {
    return (
      <Typography variant="h5" color="error" size="sm">
        An error has occurred in Population Sciences API
      </Typography>
    );
  }

  return (
    <StudyThemeProvider>
      <Snackbar
        snackbarState={snackbarState}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        // classes={classes}
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
                <span className={classes.headerStudyShortName}>
                   {studyHeader.study_short_name }
                </span>
              </span>
            </div>

            <div className={classes.headerStudyName}>
              <span style={{verticalAlign: 'bottom'}}>
                {studyHeader.study_name}
              </span>
            </div>
          </div>

          <div className={classes.numOfparticipants}>
            <span className={classes.numOfparticipantsText}>
              Participants in this Study&nbsp;:&nbsp;&nbsp;
            </span>
            <span className={classes.numOfparticipantsCount}>
              { studyHeader.number_of_participants || 0}
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
