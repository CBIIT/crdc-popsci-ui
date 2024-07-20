import React from 'react';
import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './overviewThemeConfig';
import { externalIcon } from '../../../../bento/studyDetailData';
import { cn } from 'bento-components';
import StudyPersonnel from './StudyPersonnel';
import styles from './overviewStyle';
import { customSorting } from '../../../../utils/utils';

const Overview = ({ classes, data, }) => {
  const { study_personal } = data;

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

  const enrollmenPeriod = data?.enrollment_beginning_year + ' - ' + data?.enrollment_ending_year;
  const studyPeriod = data?.study_beginning_year + ' - ' + data?.study_ending_year;

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
              {renderInfo('ENROLLMENT PERIOD', enrollmenPeriod)}
              {renderInfo('STUDY PERIOD', studyPeriod)}
              {renderInfo('BIOSPECIMEN COLLECTION', data.biospecimen_collection)} {/* TODO: check => Biospecimen or Biospecimens and Collected or Collection */}
              {renderInfo('STATUS', data?.study_status)}
              {renderInfo('dbGaP ID', data?.dbgap_accession_id)}
              {renderInfo('EXTERNAL ID', data?.study_id)}

              <Grid container direction="column" >
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>Associated Links</span>
                </Grid>

                <AssociatedLinks classes={classes} sortedLinks={sortedLinks} />
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
      
      {/* Study Personnel Section */}
      <div className={classes.studyFileContainer}>
        <Typography variant="h6" className={classes.studyPersonnelTitle}>Study Personnel</Typography>
        {study_personal.length > 0 ? (
          <div className={classes.studyPersonnelTable}>
            <StudyPersonnel data={study_personal} />
          </div>
        ): (
          <div className={classes.noStudyRecords}>
            <Typography className={classes.noData} variant="h6">
              This Study currently has no Study Personnel records associated with it
            </Typography>
          </div> 
        )}
      </div>
    </OverviewThemeProvider>
  );
};

const ExternalLinkIcon = ({ classes }) => (
  <img
    src={externalIcon}
    width={14}
    height={14}
    className={classes.externalLinkIcon}
    alt="outbound website icon"
  />
);

const AssociatedLinks = ({ sortedLinks, classes }) => {
  if (sortedLinks.length === 0) {
    return (
      <Grid item xs={12} className={classes.mainValue}>
        <Typography className={classes.noData} variant="h6">
          This Study currently has no additional links associated with it
        </Typography>
      </Grid>
    );
  }

  return sortedLinks.map((link, index) => (
    <Grid item xs={12} className={classes.mainValue} key={index}>
      <a
        href={link?.associated_link_url}
        className={classes.link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {link?.associated_link_name}
      </a>
      &nbsp;<ExternalLinkIcon classes={classes} /> <br />
    </Grid>
  ));
};

export default withStyles(styles, { withTheme: true })(Overview);