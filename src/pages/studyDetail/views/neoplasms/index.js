import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './theme';
import { cn } from 'bento-components';
import styles from './style';

const Neoplasms = ({ classes, data, }) => {
  const { primary_diagnosis_disease_term, primary_diagnosis_disease_count, } = data;

  const renderInfo = (label, value = '') => (
    <div className={classes.keyAndValueRow}>
      <span className={classes.label}>
        {label}
      </span>
      <span className={classes.value}>
        {value}
      </span>
    </div>
  );

  return (
    <OverviewThemeProvider>
      <div className={classes.detailContainer}>
        <Grid container>
          {/* Left Container Detail */}
          <Grid item xs={12} sm={6} className={cn(classes.borderRight, classes.detailContainerLeft)}>
            <div className={classes.scrollDiv}>
              <Grid container direction="column" className={classes.leftInnerContainer} >
                {renderInfo('NUMBER OF NEOPLASMS', primary_diagnosis_disease_count)}
                
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>NEOPLASMS</span>
                </Grid>
                <Grid item xs={12} className={classes.mainValue}>
                  { primary_diagnosis_disease_term || ''}
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* Right Container Detail 
          <Grid item xs={12} sm={6} className={cn(classes.detailContainerRight, classes.scrollDiv)}>
            <Grid container direction="column" className={classes.rightInnerContainer}>
            
              {renderInfo('STUDY TYPE', data?.study_type)}
              {renderInfo('STUDY DESIGN', data?.study_design)}
              {renderInfo('ENROLLMENT PERIOD', enrollmenPeriod)}
              {renderInfo('STUDY PERIOD', studyPeriod)}
              {renderInfo('BIOSPECIMEN COLLECTION', data.biospecimen_collection)} {/* TODO: check => Biospecimen or Biospecimens and Collected or Collection 
              {renderInfo('STATUS', data?.study_status)}
              {renderInfo('dbGaP ID', data?.dbgap_accession_id)}
              {renderInfo('EXTERNAL ID', data?.study_id)}

              <Grid container direction="column" >
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>Associated Links</span>
                </Grid>

              </Grid>

            </Grid>
          </Grid>
          */}
        </Grid>
      </div>
      
    </OverviewThemeProvider>
  );
};


export default withStyles(styles, { withTheme: true })(Neoplasms);