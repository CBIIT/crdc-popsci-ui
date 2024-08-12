import React from 'react';
import {
  Grid,
  withStyles,
  Typography,
} from '@material-ui/core';
import ThemeProvider from './themeConfig';
import PropTypes from 'prop-types';

// Reusable sort function
const sortArrayAlphabetically = (array) => {
  return array.slice().sort((a, b) => {
    const nameA = a.replace(/[^a-zA-Z ]/g, '').trim();
    const nameB = b.replace(/[^a-zA-Z ]/g, '').trim();
    return nameA.localeCompare(nameB);
  });
};

const Country = ({
  classes,
  data,
}) => {

  // Apply the reusable sort function
  const sortedCountries = sortArrayAlphabetically(data?.study_country || []);
  const sortedStatesProvincesTerritories = sortArrayAlphabetically(data?.study_state_province_territory || []);

  return (
    <ThemeProvider>
      <div className={classes.page}>
        <Grid container className={classes.container} spacing={3}>
          <Grid item xs={12} sm={6} className={classes.section}>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>NUMBER OF COUNTRIES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Typography className={classes.value}>{data?.number_of_countries || "N/A"}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>COUNTRIES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  {sortedCountries.map((country, index) => (
                    <Typography key={index} className={classes.value}>{country}</Typography>
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
                  <Typography className={classes.label}>NUMBER OF STATES, PROVINCES AND TERRITORIES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Typography className={classes.value}>{data?.number_of_states_provinces_territories || "N/A"}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>STATES, PROVINCES AND TERRITORIES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  {sortedStatesProvincesTerritories.map((item, index) => (
                    <Typography key={index} className={classes.value}>{item}</Typography>
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
    color: '#245F7B',
    fontSize: '16px !important',
    fontWeight: '700',
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
    color: '#4B4B4B',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  divider2: {
    borderLeft: '2px solid #76C4E4',
    height: '100%',
    marginLeft: '20px',
    marginRight: '20px',
  },
});

Country.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    study_country: PropTypes.arrayOf(PropTypes.string),
    study_state_province_territory: PropTypes.arrayOf(PropTypes.string),
    number_of_countries: PropTypes.number,
    number_of_states_provinces_territories: PropTypes.number,
  }),
};

export default withStyles(styles, { withTheme: true })(Country);
