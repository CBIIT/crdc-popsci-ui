import React from 'react';
import {
  Grid,
  withStyles,
  Typography,
} from '@material-ui/core';
import ThemeProvider from './themeConfig'; 

const Country = ({
  classes,
  data,
}) => {

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
                  <Typography className={classes.value}>{data?.number_of_countries || ""}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>COUNTRIES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                 {data?.study_country.length > 0 && data.study_country.map((contry, index) => (
                    <Typography key={index} className={classes.value}>{contry}</Typography>
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
                    <Typography className={classes.value}>{data?.number_of_states_provinces_territories || ""}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>STATES, PROVINCES AND TERRITORIES</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  {data?.study_state_province_territory.length > 0 && data.study_state_province_territory.map((item, index) => (
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

export default withStyles(styles, { withTheme: true })(Country);
