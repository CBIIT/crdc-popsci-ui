// src/components/Demographics.jsx
import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_STUDY_DETAIL_DEMOGRAPHIC_DATA_QUERY } from '../../../../bento/studyDetailData';
import ThemeProvider from './themeConfig';
import StatsSection from './components/StatsSection';
import ChartSection from './components/ChartSection';

function useDemographicsData(studyShortName) {
  const { loading, error, data: raw } = useQuery(
    GET_STUDY_DETAIL_DEMOGRAPHIC_DATA_QUERY,
    {
      variables: { study_short_name: [studyShortName] },
      context: { clientName: 'mockService' },
    }
  );
  const demo = raw?.studyDemographics?.[0] || {};
  return { loading, error, demo };
}

const Demographics = ({ classes, studyShortName }) => {
  const { loading, error, demo } = useDemographicsData(studyShortName);

  if (loading) return <Typography>Loading…</Typography>;
  if (error)   return <Typography>Error loading demographics</Typography>;

  return (
    <ThemeProvider>
      <div className={classes.page}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} sm={6} className={classes.section}>
            <StatsSection demo={demo} />
          </Grid>

          <Grid item xs={1}>
            <div className={classes.divider} />
          </Grid>

          <Grid item xs={12} sm={5} className={classes.section}>
            <ChartSection demo={demo} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

const styles = theme => ({
  // General page styles 
  page: {},
  container: { padding: '0 68px' },
  section: { margin: '40px 0 120px 0' },
  divider: {
    borderLeft: '2px solid #76C4E4',
    height: '100%',
    marginLeft: '20px',
    marginRight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(Demographics);
