import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './overviewThemeConfig';
// import { externalIcon } from '../../../bento/studyDetailData';
import { cn } from 'bento-components';


const Overview = ({
  classes,
  data,
}) => {
/*
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
*/
  return (
    <OverviewThemeProvider>
      <div className={classes.detailContainer}>
        <Grid container>
          {/* Left Container Detail */}
          <Grid item xs={12} sm={6} className={cn(classes.borderRight, classes.detailContainerLeft)}>
          <div className={classes.leftDiv}>
            <Grid container direction="column" >
              <Grid item xs={12} className={cn(classes.title, classes.firstTitle)}>
                <span>Description</span>
              </Grid>
              <Grid item xs={12} className={cn(classes.content, classes.contentUnderTitle)}>
                {data.study_description || ''}
              </Grid>
            </Grid>
          </div>
            
          </Grid>

          {/* Right Container Detail */}
          <Grid item xs={12} sm={6} className={classes.detailContainerRight}>
            <Grid container direction="column">
              
              <Grid item className={cn(classes.title, classes.firstTitle)} >
                <span style={{ minWidth: '164px', width: '164px', marginRight: '55px' }}>Study Type</span>
                <span className={classes.content}> {data?.study_type || ''} </span>
              </Grid>

              <Grid item className={classes.title} >
                <span className={classes.titleSpan} >Study Design</span>
                <span className={classes.content}> {data?.study_design || ''} </span>
              </Grid>

              <Grid item className={classes.title} >
                <span className={classes.titleSpan}>ENROLLMENT PERIOD</span>
                <span className={classes.content}>
                  {`${data?.enrollment_beginning_year} - ${data?.enrollment_ending_year}`}
                </span>
              </Grid>

              <Grid item className={classes.title} >
                <span className={classes.titleSpan}> STUDY PERIOD </span>
                <span className={classes.content}>
                  {`${data?.study_beginning_year} - ${data?.study_ending_year}`}
                </span>
              </Grid>

              <Grid item className={classes.title} >
                <span className={classes.titleSpan}>Biospecimen Collection</span> {/* TODO: check => Biospecimen or Biospecimens and Collected or Collection */}
                <span className={classes.content}> {data.biospecimen_collection || ''} </span>
              </Grid>






              <Grid item className={classes.title}>
                <span className={classes.titleSpan}>Status</span>
                <span className={classes.content}> {data?.study_status || ''} </span>
              </Grid>

              <Grid item className={classes.title} >
                <span className={classes.titleSpan} style={{ textTransform: 'none' }}>dbGap ID</span>
                <span className={classes.content}> {data?.study_design || ''} </span>
              </Grid>

              <Grid item className={classes.title} >
                <span className={classes.titleSpan}>External ID</span>
                <span className={classes.content}> {data?.study_id || ''} </span>
              </Grid>

               <Grid item className={classes.title} >
                <span className={classes.titleSpan}>Associated Links</span>
                <span className={classes.contentUnderTitle}> Under construction </span>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
  </OverviewThemeProvider>
  );
};

const styles = (theme) => ({
  titleSpan: {
    minWidth: '225px',
    width: '225px',
    marginRight: '55px'
  },
  detailContainer: {
    margin: 'auto',
    paddingLeft: '50px',
    paddingRight: '50px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top
    // padding: theme.spacing(2),
  },
  borderRight: {
    borderRight: '1px solid #76C4E4',
  },
  detailContainerLeft: {
    display: 'block',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px) !important',
    marginLeft: '-8px',
    paddingTop: '30px'
  },
  leftDiv: {
    padding: '0px 61px 5px 8px',
    minHeight: '730px',
    maxHeight: '730px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px) !important',
    marginLeft: '-8px',
  },

  content: {
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',

    color: '#4B4B4B'
  },
  contentUnderTitle: {
    margin: '4px 0px 0px 10px',

  },
  contentBesideTitle: {

  },

  firstTitle: {
    marginTop: '0px !important'
  },
  title: {
    marginTop: '20px',

    '& > span:first-child': {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '20.8px',
      letterSpacing: '-0.01em',

      color: '#27424E',

      textTransform: 'uppercase',
    }
  },
  detailContainerRight: {
    margin: '30px 0px 0px 0px',
    padding: '0px 25px 5px 43px',
    minHeight: '300px',
    height: '900px',
    // maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px)',
  },

  link: {
    color: '#990099',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: theme.custom.fontFamilyNunito
  },
  externalLinkIcon: {
    marginLeft: '5px'
  },

  '@media (max-width: 1099px)': {
    detailContainerRightTopParticipant: {
      marginTop: '40px',
    },
    imageCollection: {
      marginTop: '55px',
      paddingLeft: '0px',
    },
    participantFileH: {
      paddingLeft: '0px',
    },
    participantFileC: {
      paddingLeft: '0px',
    },
  },
  '@media (max-width: 899px)': {
    detailContainerLeft: {
      padding: '0px 31px 5px 8px',
    },
    detailContainerRight: {
      padding: '0px 0px 5px 25px',
    },
  },
  '@media (max-width: 799px)': {
    borderRight: {
      borderRight: 'none',
    },
    detailContainerLeft: {
      minHeight: 'fit-content'
    },
    detailContainerRight: {
      padding: '0px 0px 5px 0px',
    },
  },
  '@media (max-width: 460px)': {
    detailContainer: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },



  // title: {
  //   fontWeight: 'bold',
  //   marginBottom: theme.spacing(1),
  //   display: 'flex',
  //   alignItems: 'center',
  // },
  // firstTitle: {
  //   marginTop: 0,
  // },
  // content: {
  //   marginBottom: theme.spacing(2),
  // },
  // contentUnderTitle: {
  //   marginTop: theme.spacing(1),
  // },


});

export default withStyles(styles, { withTheme: true })(Overview);
