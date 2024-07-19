import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './overviewThemeConfig';
import { externalIcon } from '../../../../bento/studyDetailData';
import { cn } from 'bento-components';
import StudyPersonnel from './StudyPersonnel';
import styles from './overviewStyle';

const Overview = ({ classes, data, }) => {
  const { study_personal } = data;

  const ExternalLinkIcon = () => {
    return (
      <img 
        src={externalIcon}
        width={14}
        height={14}
        className={classes.externalLinkIcon}
        alt='outbounnd web site icon'/>
    )
  }

  const customSorting = (a, b) => {
    let val = 0
    if(a < b) { val = -1; }
    if(a > b) { val = 1; }
    return val;
  }

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

  const sortedLinks = [...(data?.study_links || [])].sort((a, b) => customSorting(a.associated_link_id, b.associated_link_id));

  return (
    <OverviewThemeProvider>
      <div className={classes.detailContainer}>
        <Grid container>
          {/* Left Container Detail */}
          <Grid item xs={12} sm={6} className={cn(classes.borderRight, classes.detailContainerLeft)}>
            <div className={classes.scrollDiv}>
              <Grid container direction="column" className={classes.leftInnerContainer} >
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>Description</span>
                </Grid>
                <Grid item xs={12} className={classes.mainValue}>
                  {data.study_description || ''}
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* Right Container Detail */}
          <Grid item xs={12} sm={6} className={cn(classes.detailContainerRight, classes.scrollDiv)}>
            <Grid container direction="column" className={classes.rightInnerContainer}>
            
              {renderInfo('STUDY TYPE', data?.study_type)}
              {renderInfo('STUDY DESIGN', data?.study_design)}
              {renderInfo('ENROLLMENT PERIOD', `${data?.enrollment_beginning_year} - ${data?.enrollment_ending_year}`)}
              {renderInfo('STUDY PERIOD', `${data?.study_beginning_year} - ${data?.study_ending_year}`)}
              {renderInfo('BIOSPECIMEN COLLECTION', data.biospecimen_collection)} {/* TODO: check => Biospecimen or Biospecimens and Collected or Collection */}
              {renderInfo('STATUS', data?.study_status)}
              {renderInfo('dbGaP ID', data?.dbgap_accession_id)}
              {renderInfo('EXTERNAL ID', data?.study_id)}

              <Grid container direction="column" >
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>Associated Links</span>
                </Grid>
                {sortedLinks.map((link, index) => (
                  <Grid item xs={12} className={classes.mainValue} key={index}>
                    <a
                      href={link?.associated_link_url}
                      className={classes.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link?.associated_link_name}
                    </a>&nbsp;<ExternalLinkIcon/> <br/>
                  </Grid>
                ))}
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
      
      {/* Study File Container */}

      <div className={classes.studyFileContainer}>
        <p className={classes.studyPersonnelTitle}>Study Personnel</p>
        {
          study_personal 
          ? 
            <div className={classes.studyPersonnelTable}>
              <StudyPersonnel data={study_personal} />
            </div>
          : 
            <div className={classes.noStudyRecords}>
              This Study currently has no Study Personnel records associated with it
            </div> 
        }
      </div>

  </OverviewThemeProvider>
  );
};

export default withStyles(styles, { withTheme: true })(Overview);