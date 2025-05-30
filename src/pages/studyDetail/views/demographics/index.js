import React from 'react';
import { Box, Grid, Typography, withStyles, useMediaQuery } from '@material-ui/core';
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

const Demographics = ({ classes, data, studyShortName }) => {
  // Mock Demographics Data
  const { loading, error, demo } = useDemographicsData(studyShortName);
  const isUnder800px = useMediaQuery('(max-width:800px)'); // Check if screen width is under 800px

  if (loading) return <Typography>Loading ...</Typography>;
  if (error)   return <Typography>Error loading demographics</Typography>;

  return (
    <ThemeProvider>
      <div className={classes.page}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} sm={6} className={classes.section}>
            <StatsSection data={data} demo={demo} />
          </Grid>

          {!isUnder800px && <div className={classes.divider} />}

          <Grid item xs={12} sm={6} className={classes.charts}>
            <ChartSection data={data} demo={demo} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

const styles = theme => ({
  page: { position: 'relative' },
  container: { padding: '0 68px', position: 'relative' },
  section: { margin: '40px 0 120px 0' },
  charts: { margin: '20px 0 120px 0' },
  divider: {
    position: 'absolute',
    left: '50%',
    top: 10,
    bottom: 0,
    borderLeft: '2px solid #76C4E4',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
  },
});

export default withStyles(styles, { withTheme: true })(Demographics);
