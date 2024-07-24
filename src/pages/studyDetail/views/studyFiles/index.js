import React from 'react';
import {
  Typography,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './ThemeConfig';
import StudyPersonnel from './StudyFileTable';
import styles from './style';

const StudyFiles = ({ classes, data, }) => {
  const { data_file = [] } = data;

  return (
    <OverviewThemeProvider>
      {/* Study Personnel Section */}
      <div className={classes.studyFileContainer}>
        {data_file.length > 0 ? (
          <div className={classes.studyPersonnelTable}>
            <StudyPersonnel data={data_file} />
          </div>
        ): (
          <div className={classes.noStudyRecords}>
            <Typography className={classes.noData} variant="h6">
              This Study currently has no Files associated with it
            </Typography>
          </div> 
        )}
      </div>
    </OverviewThemeProvider>
  );
};

export default withStyles(styles, { withTheme: true })(StudyFiles);