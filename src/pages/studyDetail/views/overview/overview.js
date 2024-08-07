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
import { customSorting } from '../../../../utils/utils';

const Overview = ({ classes, data, }) => {
  const {
    study_description,
    study_design,
    enrollment_beginning_year,
    enrollment_ending_year,
    study_beginning_year,
    study_ending_year,
    biospecimen_collection,
    study_status,
    dbgap_accession_id,
    study_id,
    personnel = [],
    associated_links = []
  } = data;

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

  const sortedLinks = [...associated_links].sort((a, b) => customSorting(a.associated_link_id, b.associated_link_id));

  const enrollmenPeriod = `${enrollment_beginning_year} - ${enrollment_ending_year}`;
  const studyPeriod = `${study_beginning_year} - ${study_ending_year}`;

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
                  {study_description || ''}
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* Right Container Detail */}
          <Grid item xs={12} sm={6} className={cn(classes.detailContainerRight, classes.scrollDiv)}>
            <Grid container direction="column" className={classes.rightInnerContainer}>
            
              {renderInfo('STUDY DESIGN', study_design)}
              {renderInfo('ENROLLMENT PERIOD', enrollmenPeriod)}
              {renderInfo('STUDY PERIOD', studyPeriod)}
              {renderInfo('BIOSPECIMEN COLLECTION', biospecimen_collection)} {/* TODO: check => Biospecimen or Biospecimens and Collected or Collection */}
              {renderInfo('STATUS', study_status)}
              {renderInfo('dbGaP ID', dbgap_accession_id)}
              {renderInfo('EXTERNAL ID', study_id)}


              <Grid container direction="column" >
                <Grid item xs={12} className={`${classes.mainLabel} ${classes.paddingTop}`}>
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
        <p className={classes.studyPersonnelTitle}>Study Personnel</p>
        {personnel.length > 0 ? (
          <div className={classes.studyPersonnelTable}>
            <StudyPersonnel data={personnel} />
          </div>
        ): (
          <div className={classes.noStudyRecords}>
            <p className={classes.noData}>
              This Study currently has no Study Personnel records associated with it
            </p>
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
        <p className={classes.noData}>
          This Study currently has no additional links associated with it
        </p>
      </Grid>
    );
  }

  return sortedLinks.map((link, index) => (
    <Grid item xs={12} className={classes.mainValue} key={`${link.associated_link_name}-${index}`}>
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