import React from 'react';
import {
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
            <p className={classes.noData}>
              This Study currently has no Files associated with it
            </p>
          </div> 
        )}
      </div>
    </OverviewThemeProvider>
  );
};

export default withStyles(styles, { withTheme: true })(StudyFiles);