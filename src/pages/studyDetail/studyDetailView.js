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
import Overview from './views/overview';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import TabContentWrapper from './TabContentWrapper';


const StudyDetailView = ({ classes, data, isLoading=false, isError=false}) => {

  const {
    study_name,
    study_short_name,
    study_description,
    study_type,
    study_design,
    enrollment_period_start, // was enrollment_beginning_year
    enrollment_period_end, // was enrollment_ending_year
    study_period_start, // was study_beginning_year
    study_period_end, // was study_ending_year
    biospecimens_collected, // was biospecimen_collection
    study_status,
    dbGap_id, // was dbgap_accession_id
    number_of_participants ,
    // associated_links,
    // max_age,
    // medium_age,
    // min_age,
    // study_race,
    // study_ethnicity,
    // study_sex,
    // study_gender,
    // country_list,
    // country_count,
    // state_list,
    // state_count,
    // primary_diagnosis_disease_term,
    // primary_diagnosis_disease_count,

    // study_personal, // [study_personal]
    // study_publication, // [study_publication]
    // study_files, // [study_files]
    // study_links, // [study_links]
    
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
    enrollment_beginning_year: enrollment_period_start, 
    enrollment_ending_year: enrollment_period_end, 
    study_beginning_year: study_period_start, 
    study_ending_year: study_period_end, 
    biospecimen_collection: biospecimens_collected, 
    study_status,
    dbgap_accession_id: dbGap_id, 
    study_id: "None" // TODO: What is study_id?
  };
  
  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });

  // function openSnack(value) {
  //   setsnackbarState({ open: true, value, action: 'added' });
  // }
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

  const breadCrumbJson = [{
    name: 'Explore',
    to: '/explore',
    isALink: true,
  }, {
    name: studyHeader.study_short_name,
    to: '',
    isALink: false,
  }];

  const processedTabs = [
    { 
      index: 0,
      label: 'Overview',
      content: <Overview data={overviewTabData} /> 
    },
    { 
      index: 1,
      label: 'Neoplasms',
    },
    {
      index: 2,
      label: 'Demographics',
    },
    {
      index: 3,
      label: 'Data Collected',
    },
    {
      index: 4,
      label: 'Countries and States',
    },
    {
      index: 5,
      label: 'Publications',
    },
    {
      index: 6,
      label: 'Study Files',
    },
  ];

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
            <span className={classes.numOfparticipantsText}>Participants in this Study&nbsp;:&nbsp;&nbsp;</span>
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
