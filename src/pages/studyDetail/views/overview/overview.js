import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './overviewThemeConfig';
import { externalIcon } from '../../../../bento/studyDetailData';
import { cn } from 'bento-components';


const Overview = ({
  classes,
  data,
}) => {

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
                      target="_blank">
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
        Study Personnel
      </div>
  </OverviewThemeProvider>
  );
};

const styles = (theme) => ({
  detailContainer: {
    margin: 'auto',
    paddingLeft: '64px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top
    minHeight: '730px',
    maxHeight: '730px',
    borderBottom: '1px solid #76C4E4',
    // borderRight: '1px solid #76C4E4',
  },
  borderRight: {
    borderRight: '1px solid #76C4E4',
  },

  detailContainerLeft: {
    display: 'block',
    overflowY: 'auto',
    paddingTop: '30px',
    minHeight: '700px'
  },
  leftInnerContainer: {
    padding: '0px 65px 30px 0px'
  },

  detailContainerRight: {
    marginTop: '30px',
  },
  rightInnerContainer: {
    padding: '0px 53px 30px 43px',
  },

  scrollDiv: {
    minHeight: '700px',
    maxHeight: '700px',
    overflowY: 'scroll',

    '&::-webkit-scrollbar': {
      width: '0.5em',
      height: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px white',
      borderRadius: '0px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #76C4E4',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#76C4E4',
      outline: '1px solid slategrey',
      borderRadius: '0px',
    },
  },

  mainLabel: {
    '& > span:first-child': {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '20.8px',
      letterSpacing: '-0.01em',

      color: '#27424E',
      textTransform: 'uppercase',
    },
  },
  mainValue: {
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',

    color: '#4B4B4B',
    margin: '4px 0px 0px 10px',
  },

  keyAndValueRow: {
    display: 'flex',
    margin: '0px',
    padding: '0px',
  },
  label: {
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '16.8px',
    letterSpacing: '-0.01em',

    color: '#27424E',
    textAlign: 'left',
    width: '164px',
    minWidth: '164px',
    marginBottom: '20px',
  },
  value: {
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',

    color: '#4B4B4B',
    textAlign: 'left',
    paddingLeft: '55px',
  },

  link: {
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '18px',
    textAlign: 'left',
    color: '#005D85',
    textDecoration: 'underline',
    marginBottom: '5px',
  },
  externalLinkIcon: {
    marginLeft: '3px'
  },

  /********           Smaller Screen Style              ********/
  '@media (max-width: 950px)': {
    detailContainer: {
      paddingLeft: '24px',
    },
    rightInnerContainer: {
      paddingLeft: '24px',
    },
    value: {
      paddingLeft: '24px',
    }
  },

  /********           Switch from Two to one column based layout      ********/
  '@media (max-width: 799px)': {
    detailContainer: {
      minHeight: 'fit-content',
      maxHeight: 'fit-content',
      borderRight: 'none',
    },
    leftInnerContainer: {
      padding: '0px 53px 0px 0px'
    },
    rightInnerContainer: {
      padding: '0px 53px 0px 0px'
    },
    scrollDiv: {
      maxHeight: 'fit-content',
      minHeight: 'fit-content',
      overflowY: 'auto',
    },
    borderRight: {
      borderRight: 'none',
    },
    detailContainerLeft: {
      minHeight: 'fit-content'
    },
    detailContainerRight: {
      minHeight: 'fit-content',
      paddingBottom: '30px',
    },
  },

  /********           Mobile sizing              ********/
  '@media (max-width: 470px)': {
    detailContainer: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    value: {
      paddingLeft: '10px'
    },
  },


  studyFileContainer: {
    margin: '56px 70px 100px 64px',
    minHeight: '350px',

    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '20.8px',
    letterSpacing: '-0.01em',
    textAlign: 'left',

    textTransform: 'uppercase',
  }
});

export default withStyles(styles, { withTheme: true })(Overview);