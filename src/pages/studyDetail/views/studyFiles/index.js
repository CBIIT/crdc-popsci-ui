import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './ThemeConfig';
import StudyPersonnel from './StudyFileTable';
import styles from './style';

const StudyFiles = ({ classes, data, }) => {
  const accessTypes = ["Open Access", "Controlled Access"];
  
  const { data_file = [] } = data;
  const data_file_with_access = data_file.map(item => ({
    ...item,
    data_file_access_control: accessTypes[Math.floor(Math.random() * accessTypes.length)]
  }));

  return (
    <OverviewThemeProvider>
      {/* Study Personnel Section */}
      <div className={classes.studyFileContainer}>
        {data_file_with_access.length > 0 ? (
          <div className={classes.studyPersonnelTable}>
            <StudyPersonnel data={data_file_with_access} />
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