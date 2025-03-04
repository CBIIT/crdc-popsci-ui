import React from 'react';
import {
  Grid,
  withStyles,
  Typography,
} from '@material-ui/core';
import ThemeProvider from './themeConfig'; 

const Demographics = ({
  classes,
  data,
}) => {
  // Split and sort the arrays in ascending order
  // Define a sorting function that removes non-alphabetic characters
const cleanAndSort = (array) => {
    return array?.split('|').sort((a, b) => {
        const nameA = a.replace(/[^a-zA-Z ]/g, '').trim();
        const nameB = b.replace(/[^a-zA-Z ]/g, '').trim();
        return nameA.localeCompare(nameB);
    }) || [];
};

// Apply the sorting function to all arrays
const races = cleanAndSort(data?.race);
const ethnicities = cleanAndSort(data?.ethnicity);
const sexes = cleanAndSort(data?.sex);

  let number_of_participants = 0;

  if (data && data.number_of_participants) {
    const parsedNumber = parseInt(data.number_of_participants, 10);
    if (!isNaN(parsedNumber)) {
      number_of_participants = parsedNumber.toLocaleString();
    }
  }

  return (
    <ThemeProvider>
      <div className={classes.page}>
        <Grid container className={classes.container} spacing={3}>
          <Grid item xs={12} sm={6} className={classes.section}>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>NUMBER OF PARTICIPANTS</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Typography className={classes.value}>{number_of_participants}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <span className={classes.label}>PARTICIPANT AGE RANGE </span><span className={classes.unboldLabel}>  (years)</span>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Typography className={classes.value}>{data?.study_participant_minimum_age || ""} - {data?.study_participant_maximum_age || ""}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <span className={classes.label}>MEDIAN PARTICIPANT AGE</span><span className={classes.unboldLabel}>  (years)</span>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Typography className={classes.value}>{data?.study_participant_median_age || ""}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>PARTICIPANT RACES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  {races.length > 0 && races.map((race, index) => (
                    <Typography key={index} className={classes.value}>{race}</Typography>
                  ))}
                </Grid>
              </Grid>
            </div>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>PARTICIPANT ETHNICITIES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  {ethnicities.length > 0 && ethnicities.map((ethnicity, index) => (
                    <Typography key={index} className={classes.value}>{ethnicity}</Typography>
                  ))}
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={1}>
            <div className={classes.divider2}></div>
          </Grid>

          <Grid item xs={12} sm={5} className={classes.section}>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>PARTICIPANT SEXES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  {sexes.length > 0 && sexes.map((sex, index) => (
                    <Typography key={index} className={classes.value}>{sex}</Typography>
                  ))}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

const styles = (theme) => ({
  page: {},
  container: {
    padding: '0 68px',
  },
  item: {
    paddingBottom: '33px',
  },
  section: {
    margin: '40px 0 120px 0',
  },
  label: {
    color: '#27424E',
    fontSize: '16px !important',
    fontWeight: '700',
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
  },
  unboldLabel: {
    color: '#27424E',
    fontSize: '16px !important',
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
  },
  value: {
    fontSize: '16px !important',
    fontWeight: '400',
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
    paddingLeft: '40px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  divider: {
    height: '277px',
    borderLeft: '7px solid #76C4E4',
    marginLeft: '14px',
    marginRight: '20px',
    marginTop: '100px',
    float: 'left',
  },
  divider2: {
    borderLeft: '2px solid #76C4E4',
    height: '100%',
    marginLeft: '20px',
    marginRight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(Demographics);
