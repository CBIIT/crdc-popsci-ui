import React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import OverviewThemeProvider from './ThemeConfig';
import StudyFileTable from './StudyFileTable';
import styles from './style';

/**
 * Component for displaying study files in a table format
 * @param {Object} props - Component props
 * @param {Object} props.classes - Material-UI classes
 * @param {Array} props.data - Array of file data
 * @param {string} props.studyShortName - Short name of the study
 */
const StudyFiles = ({ classes, data = [], studyShortName }) => {
  const hasFiles = Array.isArray(data) && data.length > 0;

  const renderNoFilesMessage = () => (
    <div className={classes.noStudyRecords}>
      <Typography className={classes.noData} variant="body1" align="center">
        This Study currently has no Files associated with it
      </Typography>
    </div>
  );

  const renderFilesTable = () => (
    <div className={classes.studyPersonnelTable}>
      <StudyFileTable data={data} studyShortName={studyShortName} />
    </div>
  );

  return (
    <OverviewThemeProvider>
      <div className={classes.studyFileContainer}>
        {hasFiles ? renderFilesTable() : renderNoFilesMessage()}
      </div>
    </OverviewThemeProvider>
  );
};

export default withStyles(styles, { withTheme: true })(StudyFiles);